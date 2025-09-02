const fs = require('fs');
const path = require('path');

class RustAssetManager {

    constructor(directory) {
        this.directory = directory;
        this.validateRustInstallation();
    }

    /**
     * Validates that the provided Rust installation path is valid
     */
    validateRustInstallation() {
        if (!fs.existsSync(this.directory)) {
            throw new Error(`Rust installation directory does not exist: ${this.directory}`);
        }

        const bundleItemsDir = this.getBundleItemsDirectory();
        if (!fs.existsSync(bundleItemsDir)) {
            throw new Error(`Rust bundles directory not found: ${bundleItemsDir}\nMake sure Rust is properly installed and up to date.`);
        }

        // Check if we have any metadata files
        const metadataFiles = this.getMetadataFiles();
        if (metadataFiles.length === 0) {
            throw new Error(`No item metadata files found in: ${bundleItemsDir}\nMake sure Rust is properly installed.`);
        }

        console.log(`✅ Valid Rust installation found with ${metadataFiles.length} item files`);
    }

    /***
     * Returns the path to the bundled Rust items directory.
     * "<drive>:\SteamLibrary\steamapps\common\Rust\Bundles\items\"
     * @return {string}
     */
    getBundleItemsDirectory() {
        return path.join(this.directory, 'Bundles/items/');
    }

    /**
     * Returns a list of filenames for all of the item image files.
     * "<drive>:\SteamLibrary\steamapps\common\Rust\Bundles\items\*.png"
     */
    getImageFiles() {
        return fs.readdirSync(this.getBundleItemsDirectory()).filter(filename => filename.includes('.png'));
    }

    /**
     * Returns a list of filenames for all of the item metadata files.
     * "<drive>:\SteamLibrary\steamapps\common\Rust\Bundles\items\*.json"
     */
    getMetadataFiles() {
        return fs.readdirSync(this.getBundleItemsDirectory()).filter(filename => filename.includes('.json'));
    }

    /**
     * Combine all of the individual item metadata .json files from
     * the Rust game directory "<drive>:\SteamLibrary\steamapps\common\Rust\Bundles\items\"
     * into a single json payload.
     */
    compileItemsMetadata() {

        const items = [];
        let processedCount = 0;
        let errorCount = 0;

        // iterate metadata files
        const metadataFiles = this.getMetadataFiles();
        console.log(`Processing ${metadataFiles.length} metadata files...`);

        metadataFiles.forEach(filename => {

            try {
                // get filepath
                const filepath = path.join(this.getBundleItemsDirectory(), filename);

                // read item metadata
                const item = JSON.parse(fs.readFileSync(filepath, 'utf8'));

                // validate required fields
                if (!item.itemid || !item.shortname || !item.Name) {
                    console.warn(`Warning: Skipping ${filename} - missing required fields`);
                    return;
                }

                // push item meta we want to keep
                items.push({
                    id: item.itemid,
                    shortname: item.shortname,
                    name: item.Name,
                    description: item.Description || '',
                });

                processedCount++;
                
            } catch (error) {
                console.warn(`Warning: Failed to process ${filename}: ${error.message}`);
                errorCount++;
            }

        });

        console.log(`Processed ${processedCount} items successfully, ${errorCount} errors`);

        // Sort items by shortname for consistent output
        items.sort((a, b) => a.shortname.localeCompare(b.shortname));

        return JSON.stringify(items, null, 4);

    }

    /**
     * Writes the compiled items metadata to the provided destination
     * @param {string} destination - Path where to write the items.json file
     */
    writeItemsMetadata(destination) {
        try {
            const compiledData = this.compileItemsMetadata();
            
            // Create backup of existing file if it exists
            if (fs.existsSync(destination)) {
                const backupPath = `${destination}.backup`;
                fs.copyFileSync(destination, backupPath);
                console.log(`Created backup: ${backupPath}`);
            }
            
            fs.writeFileSync(destination, compiledData);
        } catch (error) {
            throw new Error(`Failed to write items metadata: ${error.message}`);
        }
    }

    /**
     * Copy all item images to the provided destination
     * @param {string} destination - Directory where to copy the images
     */
    copyItemImages(destination) {
        try {
            // Ensure destination directory exists
            if (!fs.existsSync(destination)) {
                fs.mkdirSync(destination, { recursive: true });
                console.log(`Created destination directory: ${destination}`);
            }

            const imageFiles = this.getImageFiles();
            let copiedCount = 0;
            let errorCount = 0;

            imageFiles.forEach((image) => {
                try {
                    const source = path.join(this.getBundleItemsDirectory(), image);
                    const dest = path.join(destination, image);
                    
                    // Only copy if source is newer or dest doesn't exist
                    if (!fs.existsSync(dest) || fs.statSync(source).mtime > fs.statSync(dest).mtime) {
                        fs.copyFileSync(source, dest);
                        copiedCount++;
                    }
                } catch (imageError) {
                    console.warn(`Warning: Failed to copy ${image}: ${imageError.message}`);
                    errorCount++;
                }
            });

            console.log(`Copied ${copiedCount} images, ${errorCount} errors`);
            
            if (errorCount > 0) {
                console.warn(`Some images could not be copied. This may be normal if files are in use.`);
            }
        } catch (error) {
            throw new Error(`Failed to copy item images: ${error.message}`);
        }
    }

}

module.exports = RustAssetManager;