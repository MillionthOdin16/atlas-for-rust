#!/usr/bin/env node
/**
 * Helper script for manually adding new items to Atlas for Rust
 * Use this when you don't have a Rust installation but want to add specific items
 * 
 * Usage: node add_item.js
 * Then follow the interactive prompts
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function addItem() {
    console.log('=== Atlas for Rust - Manual Item Addition ===\n');
    console.log('This tool helps you add a new item to the Atlas database.');
    console.log('You will need the item ID, shortname, name, description, and image file.\n');

    try {
        // Collect item information
        const id = parseInt(await question('Item ID (number): '));
        if (isNaN(id)) {
            throw new Error('Item ID must be a valid number');
        }

        const shortname = await question('Item shortname (e.g., "weapon.ak"): ');
        if (!shortname || shortname.trim() === '') {
            throw new Error('Shortname is required');
        }

        const name = await question('Item display name (e.g., "AK47"): ');
        if (!name || name.trim() === '') {
            throw new Error('Display name is required');
        }

        const description = await question('Item description (optional): ');

        const imagePath = await question('Path to item image file (256x256 PNG recommended): ');

        // Validate inputs
        console.log('\n=== Validating Input ===');

        // Check if items.json exists
        const itemsJsonPath = './src/items.json';
        if (!fs.existsSync(itemsJsonPath)) {
            throw new Error('src/items.json not found. Make sure you are running this from the repository root.');
        }

        // Load existing items
        const existingItems = JSON.parse(fs.readFileSync(itemsJsonPath, 'utf8'));

        // Check for duplicate ID
        const duplicateId = existingItems.find(item => item.id === id);
        if (duplicateId) {
            throw new Error(`Item with ID ${id} already exists: ${duplicateId.name} (${duplicateId.shortname})`);
        }

        // Check for duplicate shortname
        const duplicateShortname = existingItems.find(item => item.shortname === shortname.trim());
        if (duplicateShortname) {
            throw new Error(`Item with shortname "${shortname}" already exists: ${duplicateShortname.name}`);
        }

        // Validate image file
        if (imagePath && imagePath.trim() !== '' && !fs.existsSync(imagePath.trim())) {
            throw new Error(`Image file not found: ${imagePath}`);
        }

        console.log('✅ Input validation passed');

        // Create new item object
        const newItem = {
            id: id,
            shortname: shortname.trim(),
            name: name.trim(),
            description: description.trim() || ''
        };

        // Add to items array and sort
        existingItems.push(newItem);
        existingItems.sort((a, b) => a.shortname.localeCompare(b.shortname));

        console.log('\n=== Preview ===');
        console.log('New item to be added:');
        console.log(JSON.stringify(newItem, null, 2));

        const confirm = await question('\nDo you want to add this item? (y/N): ');
        if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
            console.log('Operation cancelled.');
            return;
        }

        // Backup existing items.json
        const backupPath = `${itemsJsonPath}.backup.${Date.now()}`;
        fs.copyFileSync(itemsJsonPath, backupPath);
        console.log(`✅ Created backup: ${backupPath}`);

        // Write updated items.json
        fs.writeFileSync(itemsJsonPath, JSON.stringify(existingItems, null, 4));
        console.log('✅ Updated src/items.json');

        // Copy image if provided
        if (imagePath && imagePath.trim() !== '') {
            const imageDestDir = './public/images/items/';
            const imageDestPath = path.join(imageDestDir, `${shortname.trim()}.png`);

            if (!fs.existsSync(imageDestDir)) {
                fs.mkdirSync(imageDestDir, { recursive: true });
            }

            fs.copyFileSync(imagePath.trim(), imageDestPath);
            console.log(`✅ Copied image to: ${imageDestPath}`);
        }

        console.log('\n=== Success! ===');
        console.log(`Item "${name}" has been added successfully.`);
        console.log('\nNext steps:');
        console.log('1. Test the changes: NODE_OPTIONS="--openssl-legacy-provider" npm run electron:serve');
        console.log('2. Verify the item appears in the application');
        console.log('3. Commit changes: git add . && git commit -m "Add new item: ' + name + '"');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    } finally {
        rl.close();
    }
}

// Run the script
if (require.main === module) {
    addItem().catch(console.error);
}

module.exports = { addItem };