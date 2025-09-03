# Atlas for Rust Maintenance Guide

This document provides guidelines for maintaining and updating the Atlas for Rust repository.

## Repository Status

- **Last Asset Update**: September 19, 2023
- **Current Items Count**: 830 items
- **Node.js Compatibility**: Requires legacy OpenSSL provider for Node.js 17+

## Asset Update Process

### Automated Updates (Preferred)

If you have a current Rust game installation:

1. Update Rust to the latest version via Steam
2. Run the asset update script:
   ```bash
   node update_assets.js "<path_to_steam>/steamapps/common/Rust"
   ```
3. Review changes and commit updates

### Manual Updates

For adding individual items without a Rust installation:

#### 1. Item Metadata Format

Items in `src/items.json` follow this structure:
```json
{
  "id": -123456789,
  "shortname": "item.internal.name",
  "name": "Display Name",
  "description": "Item description text"
}
```

#### 2. Item Images

- **Location**: `public/images/items/`
- **Naming**: Must match the item's shortname (e.g., `item.internal.name.png`)
- **Format**: PNG format, preferably 256x256 pixels
- **Source**: Extract from Rust game files or community resources

#### 3. Adding New Items

1. Find the item's game data (ID, shortname, name, description)
2. Add metadata entry to `src/items.json` (maintain alphabetical order by shortname)
3. Add corresponding image to `public/images/items/`
4. Test the changes locally
5. Submit a pull request

## Common Item Categories to Monitor

Based on Rust development patterns, commonly added items include:

- **Seasonal Items**: Halloween, Christmas, Easter decorations and cosmetics
- **Building Items**: New construction blocks, doors, decorations
- **Weapons/Tools**: New guns, melee weapons, utility tools
- **Clothing**: New skins, armor pieces, cosmetic items
- **Deployables**: New placeable items, storage, utilities
- **Consumables**: Food items, medical supplies, crafting materials

## Known Missing Updates (Sept 2023 - Present)

The following types of items/changes are likely missing and need investigation:

### Potential Missing Items (to research and add):
- Halloween 2023 event items
- Christmas 2023 event items
- Easter 2024 event items
- Halloween 2024 event items
- Any new building/construction items
- New weapon skins or variants
- Quality of life items added in monthly updates
- New monuments or map assets

### Areas Needing Research:
1. **Monthly Rust Updates**: Check changelogs from Oct 2023 onwards
2. **Event Items**: Seasonal events typically add temporary items
3. **Community Items**: Workshop items that get added to the base game
4. **Balance Changes**: Item stats or mechanics changes (though Atlas primarily needs metadata, not stats)

## Testing Changes

After making changes:

1. **Build Test**:
   ```bash
   NODE_OPTIONS="--openssl-legacy-provider" npm run build
   ```

2. **Development Test**:
   ```bash
   NODE_OPTIONS="--openssl-legacy-provider" npm run electron:serve
   ```

3. **Verify**:
   - New items appear in search
   - Images display correctly
   - No console errors
   - Application builds without issues

## Git Workflow

1. Create a feature branch for updates:
   ```bash
   git checkout -b update-assets-YYYY-MM
   ```

2. Make changes and test thoroughly

3. Commit with descriptive messages:
   ```bash
   git add .
   git commit -m "Add missing items from Rust update YYYY-MM"
   ```

4. Push and create pull request

## Release Process

After significant asset updates:

1. Update version in `package.json`
2. Update changelog or README with what was added
3. Test build process thoroughly
4. Create GitHub release if appropriate

## Community Contributions

Encourage community members to:
- Report missing items via GitHub issues
- Provide item data and images when possible
- Help identify outdated content
- Test development builds

## Troubleshooting

### Common Issues:

1. **Node.js Build Errors**: Use `NODE_OPTIONS="--openssl-legacy-provider"`
2. **Missing Images**: Ensure image filename exactly matches item shortname
3. **JSON Format Errors**: Validate JSON syntax after manual edits
4. **Large Repository Size**: Consider using Git LFS for large asset files if needed

### Maintenance Schedule:

- **Monthly**: Check for new Rust updates and items
- **Quarterly**: Update npm dependencies for security
- **Seasonally**: Expect major item additions during Rust events
- **Annually**: Review and update documentation

## Contact and Support

- **Issues**: GitHub Issues for bug reports and feature requests
- **Development**: Follow existing code patterns and conventions
- **Assets**: Maintain consistency in image quality and metadata format