#!/usr/bin/env node
/**
 * Validation script for Atlas for Rust items database
 * Checks for common issues in items.json and related image files
 */

const fs = require('fs');
const path = require('path');

function validateItemsDatabase() {
    console.log('=== Atlas for Rust - Database Validation ===\n');

    const itemsJsonPath = './src/items.json';
    const imagesDir = './public/images/items/';
    
    try {
        // Check if items.json exists
        if (!fs.existsSync(itemsJsonPath)) {
            throw new Error('src/items.json not found');
        }

        // Load and parse items.json
        const itemsData = fs.readFileSync(itemsJsonPath, 'utf8');
        const items = JSON.parse(itemsData);

        console.log(`✅ Found ${items.length} items in database`);

        // Validation checks
        const issues = [];
        const warnings = [];
        const duplicateIds = new Map();
        const duplicateShortnames = new Map();
        const missingImages = [];
        const orphanedImages = [];

        // Check each item
        items.forEach((item, index) => {
            const itemPrefix = `Item ${index + 1} (${item.shortname || 'unknown'})`;

            // Required field validation
            if (!item.id) {
                issues.push(`${itemPrefix}: Missing required field 'id'`);
            }
            if (!item.shortname) {
                issues.push(`${itemPrefix}: Missing required field 'shortname'`);
            }
            if (!item.name) {
                issues.push(`${itemPrefix}: Missing required field 'name'`);
            }

            // Type validation
            if (item.id && typeof item.id !== 'number') {
                issues.push(`${itemPrefix}: ID should be a number, got ${typeof item.id}`);
            }
            if (item.shortname && typeof item.shortname !== 'string') {
                issues.push(`${itemPrefix}: Shortname should be a string, got ${typeof item.shortname}`);
            }
            if (item.name && typeof item.name !== 'string') {
                issues.push(`${itemPrefix}: Name should be a string, got ${typeof item.name}`);
            }

            // Duplicate checking
            if (item.id) {
                if (duplicateIds.has(item.id)) {
                    issues.push(`Duplicate ID ${item.id}: "${item.name}" and "${duplicateIds.get(item.id)}"`);
                } else {
                    duplicateIds.set(item.id, item.name);
                }
            }

            if (item.shortname) {
                if (duplicateShortnames.has(item.shortname)) {
                    issues.push(`Duplicate shortname "${item.shortname}": "${item.name}" and "${duplicateShortnames.get(item.shortname)}"`);
                } else {
                    duplicateShortnames.set(item.shortname, item.name);
                }

                // Check for corresponding image
                const expectedImagePath = path.join(imagesDir, `${item.shortname}.png`);
                if (!fs.existsSync(expectedImagePath)) {
                    missingImages.push(`${item.shortname}.png (for "${item.name}")`);
                }
            }

            // Content validation
            if (item.name && item.name.trim() === '') {
                warnings.push(`${itemPrefix}: Name is empty`);
            }
            if (item.description === undefined) {
                warnings.push(`${itemPrefix}: Missing description field`);
            }
        });

        // Check for orphaned image files
        if (fs.existsSync(imagesDir)) {
            const imageFiles = fs.readdirSync(imagesDir).filter(file => file.endsWith('.png'));
            const itemShortnames = new Set(items.map(item => item.shortname));

            imageFiles.forEach(imageFile => {
                const shortname = path.basename(imageFile, '.png');
                if (!itemShortnames.has(shortname)) {
                    orphanedImages.push(imageFile);
                }
            });
        }

        // Check if items are sorted
        const sortedItems = [...items].sort((a, b) => a.shortname.localeCompare(b.shortname));
        const isSorted = JSON.stringify(items) === JSON.stringify(sortedItems);
        if (!isSorted) {
            warnings.push('Items are not sorted by shortname');
        }

        // Report results
        console.log('\n=== Validation Results ===');

        if (issues.length === 0) {
            console.log('✅ No critical issues found');
        } else {
            console.log(`❌ Found ${issues.length} critical issues:`);
            issues.forEach(issue => console.log(`  - ${issue}`));
        }

        if (warnings.length > 0) {
            console.log(`\n⚠️  Found ${warnings.length} warnings:`);
            warnings.forEach(warning => console.log(`  - ${warning}`));
        }

        if (missingImages.length > 0) {
            console.log(`\n📷 Missing ${missingImages.length} item images:`);
            missingImages.slice(0, 10).forEach(image => console.log(`  - ${image}`));
            if (missingImages.length > 10) {
                console.log(`  ... and ${missingImages.length - 10} more`);
            }
        }

        if (orphanedImages.length > 0) {
            console.log(`\n🗑️  Found ${orphanedImages.length} orphaned image files:`);
            orphanedImages.slice(0, 10).forEach(image => console.log(`  - ${image}`));
            if (orphanedImages.length > 10) {
                console.log(`  ... and ${orphanedImages.length - 10} more`);
            }
        }

        console.log('\n=== Summary ===');
        console.log(`Items: ${items.length}`);
        console.log(`Critical Issues: ${issues.length}`);
        console.log(`Warnings: ${warnings.length}`);
        console.log(`Missing Images: ${missingImages.length}`);
        console.log(`Orphaned Images: ${orphanedImages.length}`);

        if (issues.length > 0) {
            console.log('\n❌ Database has critical issues that should be fixed');
            process.exit(1);
        } else if (warnings.length > 0 || missingImages.length > 0) {
            console.log('\n⚠️  Database has warnings but is functional');
            process.exit(0);
        } else {
            console.log('\n✅ Database validation passed');
            process.exit(0);
        }

    } catch (error) {
        console.error('❌ Validation failed:', error.message);
        process.exit(1);
    }
}

// Run validation if called directly
if (require.main === module) {
    validateItemsDatabase();
}

module.exports = { validateItemsDatabase };