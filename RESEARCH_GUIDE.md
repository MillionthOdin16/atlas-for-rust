# Missing Items Research Guide

This document helps identify what Rust items are likely missing from the Atlas for Rust repository and provides guidance for researching and adding them.

## Current Repository Status

- **Last Update**: September 19, 2023
- **Items in Database**: 830 items
- **Missing Period**: October 2023 - Present (December 2024)
- **Estimated Missing Updates**: 15+ monthly Rust updates

## Likely Missing Item Categories

### 1. Seasonal Event Items (High Priority)

#### Halloween 2023 (October 2023)
- Halloween-themed decorations, costumes, or temporary items
- Jack-o'-lantern variants or decorations
- Spooky building decorations
- Halloween weapon skins

#### Christmas 2023 (December 2023)
- Christmas decorations and ornaments
- Holiday-themed clothing or accessories
- Festive building items
- Christmas weapon/tool skins

#### Easter 2024 (March/April 2024)
- Easter egg variants
- Spring-themed decorations
- Easter bunny costumes or accessories

#### Halloween 2024 (October 2024)
- New Halloween items (different from 2023)
- Additional spooky decorations
- Updated Halloween cosmetics

#### Christmas 2024 (December 2024)
- Latest Christmas items
- New holiday decorations
- Updated festive content

### 2. Monthly Update Items (Medium Priority)

Rust typically adds 1-5 new items each monthly update. Categories include:

#### Building/Construction Items
- New door types or variants
- Additional building blocks
- Decorative items for bases
- Furniture items
- Storage solutions

#### Weapons and Tools
- New weapon variants
- Tool modifications
- Weapon attachments
- Ammunition types

#### Clothing and Armor
- New armor pieces
- Clothing variants
- Cosmetic items
- Protective gear

#### Deployable Items
- New placeable items
- Utility deployables
- Electrical components
- Automation items

### 3. Quality of Life Items (Low Priority)

- Inventory management items
- Craft-related items
- Food preparation items
- Transport-related items

## Research Resources

### Official Sources
1. **Rust Blog/News** - Monthly update announcements
2. **Steam News** - Rust game updates on Steam
3. **Rust Wiki** - Community-maintained item database
4. **Reddit r/playrust** - Community discussions about updates

### Item Data Sources
1. **Rust Labs** - Comprehensive item database
2. **Rust Wiki** - Item information and images
3. **Community Databases** - Player-maintained resources

## Research Process

### 1. Monthly Update Review
For each month from October 2023 to present:
1. Check official Rust blog/Steam news for that month
2. Look for "Added Items" or "New Content" sections
3. Note item names, descriptions, and any available images
4. Check if items are permanent or temporary (event items)

### 2. Item Information Gathering
For each discovered item, collect:
- **Item ID** (from game files or databases)
- **Shortname** (internal identifier)
- **Display Name** (user-facing name)
- **Description** (item description text)
- **Image** (256x256 PNG preferred)
- **Category** (weapon, tool, clothing, building, etc.)

### 3. Verification
Before adding items:
- Verify the item still exists in current Rust
- Check that it's not a temporary event item that was removed
- Confirm the information is accurate and current

## Community Research Tasks

### High Priority Research
1. **Halloween 2023 Items** - Research October 2023 Rust updates
2. **Christmas 2023 Items** - Research December 2023 Rust updates
3. **Major Updates** - Identify any large content updates with multiple items

### Medium Priority Research
1. **Monthly Reviews** - Go through each monthly update systematically
2. **Weapon Updates** - Focus on weapon/tool additions
3. **Building Updates** - Focus on construction item additions

### Low Priority Research
1. **Skin Variants** - New skins for existing items
2. **Quality of Life** - Small utility item additions
3. **Balance Changes** - Items that were modified but not new

## Using Research Results

### When You Find Missing Items

1. **Use the Add Item Tool**:
   ```bash
   npm run add-item
   ```

2. **Batch Addition Process**:
   - Create a list of all missing items from a specific update
   - Add them systematically using the tool
   - Test the changes after adding each batch

3. **Create Pull Request**:
   - Include a clear description of what was added
   - Reference the Rust update that introduced the items
   - Include testing notes

### Information Format

When documenting findings, use this format:
```markdown
## Rust Update: [Month Year]
**Items Added**: [Number]

### New Items:
1. **[Item Name]**
   - ID: [Item ID]
   - Shortname: [shortname]
   - Description: [description]
   - Type: [category]
   - Source: [where you found this info]

2. **[Next Item]**
   - ...
```

## Contribution Guidelines

### Before Starting Research
1. Check existing GitHub issues to avoid duplicate work
2. Comment on the main issue (#5) about what period you'll research
3. Use the validation tool to understand current database state

### During Research
1. Document your sources and methods
2. Keep notes on what you've checked (even negative results)
3. Verify information from multiple sources when possible

### After Research
1. Test your additions thoroughly
2. Run the validation script to check for issues
3. Submit clear, well-documented pull requests

## Expected Timeline

### Immediate Opportunities (1-2 weeks)
- Halloween 2023 items
- Christmas 2023 items
- Any major content updates from late 2023

### Medium-term Goals (1-2 months)
- Complete audit of 2024 monthly updates
- Addition of all discoverable missing items
- Documentation of research process and findings

### Long-term Maintenance (Ongoing)
- Regular monthly checks for new items
- Community-driven updates for seasonal events
- Automated update process when possible

## Tools and Scripts Available

- `npm run validate-items` - Check database integrity
- `npm run add-item` - Interactive item addition
- `npm run update-assets` - Full asset update (requires Rust installation)

## Getting Help

- **GitHub Issues**: Report problems or ask questions
- **Community**: Connect with other Atlas for Rust users
- **Documentation**: Check MAINTENANCE.md for detailed processes

---

*This guide will be updated as research progresses and new information becomes available.*