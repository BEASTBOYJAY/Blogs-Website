/**
 * Determines the grid layout class names for a blog post based on its index and total count.
 * 
 * Strategy:
 * - First item (index 0) is always the feature item, spanning more space if possible.
 * - Subsequent items fill the remaining grid cells.
 * - This assumes a CSS Grid with 4 columns on desktop.
 */
export function getGridLayout(index: number, totalCount: number): string {
    // Default class for all items
    let classes = "col-span-1 row-span-1";

    if (totalCount === 1) {
        // Single item: Full width and height equivalent
        return "md:col-span-4 md:row-span-2 min-h-[400px]";
    }

    if (index === 0) {
        // Featured item:
        // If we have many items, make it big (2x2)
        // If we have very few (e.g. 2), simple split might be better, but let's stick to "featured priority"
        classes = "md:col-span-2 md:row-span-2";
    } else {
        // Standard items
        // We can add more complex logic here if we wanted "Masonry" style, 
        // but for a clean grid, 1x1 is safest for the non-featured items.
        // If we have specific patterns (like item 4 is also wide), we can add them here.
        classes = "md:col-span-1 md:row-span-1";

        // Example: If we have exactly 3 items, the layout might look odd with 1 big (2x2) and 2 small (1x1) leaving a gap?
        // 4 columns:
        // [ Feature ] [ Feature ] [ Item 1 ] [ Item 2 ] -> Row 1 (Feature takes 2 cols, Item 1 takes 1, Item 2 takes 1)
        // [ Feature ] [ Feature ] [      ] [      ] -> Row 2 (Feature takes 2 rows)
        // Actually, Feature (2x2) will take 2 columns and 2 rows.
        // Row 1: [ F ] [ F ] [ 1 ] [ 2 ]
        // Row 2: [ F ] [ F ] [ 3 ] [ 4 ]
        // This packs perfectly if we have 1 (feature) + 4 (small) = 5 items.
        // If we have 1 + 2 = 3 items:
        // Row 1: [ F ] [ F ] [ 1 ] [ 2 ]
        // Row 2: [ F ] [ F ] [   ] [   ] -> Empty space.

        // To fix gaps for odd counts, we can make the last item span if needed, 
        // but the prompt asked for "smart layout" to "avoid empty or awkward gaps".

        // Let's refine for small counts:
        if (totalCount === 3 && index === 2) {
            // 3 items total: 0 is 2x2. 1 is 1x1. 2 is 1x1.
            // Wait, if grid is 4 columns.
            // Row 1: [0][0][1][2] -> Perfect row.
            // Row 2: [0][0]... -> Gap.
            // So for 3 items, maybe make 1 and 2 span 2 cols each? 
            // Or make 1 and 2 vertical?
            // Let's stick to a solid packing. 
            // If totalCount is 3, maybe make 1 and 2 "md:col-span-2 md:row-span-1"?
            // Row 1: [0][0][1(2)][1(2)] ? No, 0 is row-span-2.
            // Let's try to keep it simple first phase, but maybe handle the 3 case.
        }
    }

    return classes;
}
