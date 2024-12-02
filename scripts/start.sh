#!/bin/sh

echo "Using POSTGRES_HOST=$POSTGRES_HOST"

export POSTGRES_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DB"

echo "Waiting for database to be ready..."
until node scripts/waitForDb.js; do
  echo "Database is not ready. Retrying in 5 seconds..."
  sleep 5
done

echo "Database is ready. Running Prisma commands..."
npx prisma db push

echo "Starting the development server..."
yarn dev
