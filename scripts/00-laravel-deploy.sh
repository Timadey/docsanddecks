#!/usr/bin/env bash
echo "Running composer"
composer global require hirak/prestissimo
composer install --no-dev --working-dir=/var/www/html
#composer update

echo "generating application key..."
php artisan key:generate --show

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Optimising filament components"
php artisan filament:optimize

echo 'Caching icons...';
php artisan icons:cache

echo 'Caching Filament components...';
php artisan filament:cache-components

echo 'Running artisan optimize...';
php artisan optimize

echo "Running migrations..."
php artisan migrate --force

chmod -R 775 database \
 && chown -R www-data:www-data database \
 && chown www-data:www-data database/database.sqlite \
 && chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache
