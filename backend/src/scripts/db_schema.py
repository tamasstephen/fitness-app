#!/usr/bin/env python3
"""db_schema.py

Create or recreate the PostgreSQL schema for the fitness-app.

Usage
-----
Create tables if they do not yet exist::

    python scripts/db_schema.py

Drop existing tables (and enum types) first, then recreate everything::

    python scripts/db_schema.py --reset

Connection parameters are read from the usual ``POSTGRES_*`` environment
variables, each having a sensible default for local development.
"""
from __future__ import annotations

import argparse
import os
import sys
from contextlib import contextmanager

import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

from dotenv import load_dotenv

load_dotenv("../.env")

DB_SETTINGS = {
    "dbname": os.getenv("POSTGRES_DB", "fitness_app"),
    "user": os.getenv("POSTGRES_USER", "postgres"),
    "password": os.getenv("POSTGRES_PASSWORD", "postgres"),
    "host": os.getenv("POSTGRES_HOST", "localhost"),
    "port": os.getenv("POSTGRES_PORT", "5432"),
}


@contextmanager
def get_connection():
    """Yield a PostgreSQL connection with autocommit enabled."""
    conn = psycopg2.connect(**DB_SETTINGS)
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    try:
        yield conn
    finally:
        conn.close()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def ensure_enum(cur, enum_name: str, values: list[str]) -> None:
    """Create an enum type if it does not already exist."""
    cur.execute(
        """
        SELECT 1
        FROM pg_type t
        WHERE t.typname = %s;
        """,
        (enum_name,),
    )
    if cur.fetchone():
        return

    parts = [cur.mogrify("%s", (v,)).decode() for v in values]
    formatted_vals = ", ".join(parts)
    cur.execute(
        f"CREATE TYPE {enum_name} AS ENUM ({formatted_vals});",
    )


def create_tables(cur) -> None:
    """Create enum types and tables if they don't yet exist."""
    # Enum types
    ensure_enum(
        cur,
        "training_level",
        [
            "beginner",
            "intermediate",
            "advanced",
        ],
    )
    ensure_enum(
        cur,
        "training_status",
        [
            "scheduled",
            "in_progress",
            "completed",
        ],
    )

    # Users table
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            userid VARCHAR(255) PRIMARY KEY,
            email  VARCHAR(255) UNIQUE NOT NULL,
            training_level training_level NOT NULL
        );
        """,
    )

    # Trainers table
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS trainers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            specialization VARCHAR(255),
            bio TEXT,
            image TEXT
        );
        """,
    )

    # Training sessions
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS training_session (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date_time TIMESTAMPTZ NOT NULL,
            duration INTEGER NOT NULL,     -- minutes
            status training_status NOT NULL DEFAULT 'scheduled',
            trainer_id INTEGER REFERENCES trainers(id) ON DELETE SET NULL,
            user_id VARCHAR(255) REFERENCES users(userid) ON DELETE CASCADE
        );
        """,
    )


def drop_schema(cur) -> None:
    """Drop tables and enum types if they exist (order matters)."""
    cur.execute("DROP TABLE IF EXISTS training_session CASCADE;")
    cur.execute("DROP TABLE IF EXISTS trainers CASCADE;")
    cur.execute("DROP TABLE IF EXISTS users CASCADE;")

    # Enum types after dependent tables are gone
    cur.execute("DROP TYPE IF EXISTS training_status CASCADE;")
    cur.execute("DROP TYPE IF EXISTS training_level CASCADE;")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create (or recreate) the PostgreSQL schema.",
    )
    parser.add_argument(
        "--reset",
        action="store_true",
        help="Drop existing tables and enum types before creating them.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    with get_connection() as conn:
        with conn.cursor() as cur:
            if args.reset:
                print("[INFO] Dropping existing schema …")
                drop_schema(cur)

            print("[INFO] Creating / verifying schema …")
            create_tables(cur)
            print("[INFO] Done.")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"[ERROR] {exc}", file=sys.stderr)
        sys.exit(1)
