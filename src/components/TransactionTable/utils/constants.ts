// Define CategoryOption interface inline since it's simple
interface CategoryOption {
  value: string;
  label: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'Groceries', label: '🛒 Groceries' },
  { value: 'Electricity', label: '💡 Electricity' },
  { value: 'Furniture', label: '🛋️ Furniture' },
  { value: 'Garden', label: '🌳 Garden' },
  { value: 'Clothes', label: '👕 Clothes' },
  { value: 'Transport', label: '🚗 Transport' },
  { value: 'Health', label: '🏥 Health' },
  { value: 'Dining', label: '🍽️ Dining' },
  { value: 'Entertainment', label: '🎬 Entertainment' },
  { value: 'Other', label: '📦 Other' },
];

export const ITEMS_PER_PAGE = 10;
