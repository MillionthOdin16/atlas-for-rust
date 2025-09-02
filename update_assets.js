/**
 * This script is used to update the asset files used in Atlas from the latest version of Rust.
 * Existing item images will not be deleted. Images are only added or updated.
 *
 * Prerequisites:
 * - Latest version of Rust installed via Steam
 * - Node.js environment with required dependencies
 *
 * Usage:
 * 1 - Update Rust on your PC to the latest version via Steam
 * 2 - Run: node update_assets.js "<drive>:\SteamLibrary\steamapps\common\Rust"
 * 3 - Review the changes made to src/items.json and public/images/items/
 * 4 - Test the changes: NODE_OPTIONS="--openssl-legacy-provider" npm run electron:serve
 * 5 - Commit and push the changes to GitHub
 *
 * Example paths:
 * Windows: node update_assets.js "C:\SteamLibrary\steamapps\common\Rust"
 * Linux: node update_assets.js "/home/user/.steam/steam/steamapps/common/Rust"
 * Mac: node update_assets.js "/Users/user/Library/Application Support/Steam/steamapps/common/Rust"
 */

const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const RustAssetManager = require('./tools/RustAssetManager');

// Make sure rust path is provided
const rustPath = args[0];
if(rustPath == null || typeof(rustPath) !== "string"){
   console.error("ERROR: Please provide the path to your Rust installation when running this script.");
   console.error("Usage: node update_assets.js \"<path-to-rust-installation>\"");
   console.error("");
   console.error("Common paths:");
   console.error("  Windows: \"C:\\SteamLibrary\\steamapps\\common\\Rust\"");
   console.error("  Linux: \"/home/user/.steam/steam/steamapps/common/Rust\"");
   console.error("  Mac: \"/Users/user/Library/Application Support/Steam/steamapps/common/Rust\"");
   process.exit(1);
}

// Validate that the rust path exists
if (!fs.existsSync(rustPath)) {
   console.error(`ERROR: Rust installation path does not exist: ${rustPath}`);
   console.error("Please verify the path and try again.");
   process.exit(1);
}

console.log(`Updating Atlas assets from Rust installation: ${rustPath}`);
console.log("This process will update items.json and copy item images...");

try {
   // Setup rust asset manager
   const rustAssetManager = new RustAssetManager(rustPath);

   // Check if required directories exist
   const bundleItemsDir = rustAssetManager.getBundleItemsDirectory();
   if (!fs.existsSync(bundleItemsDir)) {
      console.error(`ERROR: Rust bundles directory not found: ${bundleItemsDir}`);
      console.error("Make sure Rust is properly installed and up to date.");
      process.exit(1);
   }

   console.log(`Found Rust bundles directory: ${bundleItemsDir}`);

   // Count current items before update
   let currentItemCount = 0;
   const currentItemsPath = './src/items.json';
   if (fs.existsSync(currentItemsPath)) {
      const currentItems = JSON.parse(fs.readFileSync(currentItemsPath, 'utf8'));
      currentItemCount = currentItems.length;
      console.log(`Current items in database: ${currentItemCount}`);
   }

   // Update items.json
   console.log("Updating items metadata...");
   rustAssetManager.writeItemsMetadata('./src/items.json');
   
   // Count new items after update
   const updatedItems = JSON.parse(fs.readFileSync('./src/items.json', 'utf8'));
   const newItemCount = updatedItems.length;
   const addedItems = newItemCount - currentItemCount;
   
   console.log(`Items metadata updated: ${newItemCount} total items (${addedItems >= 0 ? '+' : ''}${addedItems} items)`);

   // Copy item images
   console.log("Copying item images...");
   rustAssetManager.copyItemImages('./public/images/items/');
   console.log("Item images updated successfully");

   console.log("");
   console.log("✅ Asset update completed successfully!");
   console.log("");
   console.log("Next steps:");
   console.log("1. Review the changes with: git status");
   console.log("2. Test the changes with: NODE_OPTIONS=\"--openssl-legacy-provider\" npm run electron:serve");
   console.log("3. Commit the changes: git add . && git commit -m \"Update Rust assets to latest version\"");
   console.log("4. Push to repository: git push");

} catch (error) {
   console.error("ERROR: Failed to update assets:", error.message);
   console.error("");
   console.error("Troubleshooting:");
   console.error("- Ensure Rust is fully updated via Steam");
   console.error("- Verify the provided path is correct");
   console.error("- Check that you have read/write permissions");
   console.error("- Make sure no other applications are using the files");
   process.exit(1);
}
