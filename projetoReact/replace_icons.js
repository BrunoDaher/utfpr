const fs = require('fs');
const path = require('path');

const iconMap = {
  'IconEye': 'BsEye',
  'IconShoppingCart': 'BsCart',
  'IconArrowLeft': 'BsArrowLeft',
  'IconBuildingStore': 'BsShop',
  'IconLogout': 'BsBoxArrowRight',
  'IconPackage': 'BsBoxSeam',
  'IconShield': 'BsShield',
  'IconDashboard': 'BsSpeedometer2',
  'IconLogin': 'BsBoxArrowInRight',
  'IconSearch': 'BsSearch',
  'IconCheck': 'BsCheckLg',
  'IconEdit': 'BsPencil',
  'IconPlus': 'BsPlusLg',
  'IconTrash': 'BsTrash',
  'IconMinus': 'BsDashLg',
  'IconAlertCircle': 'BsExclamationCircle',
  'IconSparkles': 'BsStars',
  'IconShieldCheck': 'BsShieldCheck',
  'IconTruck': 'BsTruck',
  'IconFilter': 'BsFilter'
};

const files = [
  'src/components/product/ProductCard.tsx',
  'src/layouts/AdminLayout.tsx',
  'src/layouts/AppLayout.tsx',
  'src/pages/admin/ManageProductsPage.tsx',
  'src/pages/public/CartPage.tsx',
  'src/pages/public/LoginPage.tsx',
  'src/pages/public/ProductDetailPage.tsx',
  'src/pages/public/ProductsPage.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace import
  let importedIcons = [];
  content = content.replace(/import\s+{([^}]+)}\s+from\s+'@tabler\/icons-react';/g, (match, icons) => {
    const iconList = icons.split(',').map(i => i.trim()).filter(i => i);
    const newIcons = iconList.map(i => iconMap[i] || i);
    importedIcons = newIcons;
    return `import { ${newIcons.join(', ')} } from 'react-icons/bs';`;
  });

  // Replace usages
  Object.keys(iconMap).forEach(tablerIcon => {
    const bsIcon = iconMap[tablerIcon];
    const regex = new RegExp(tablerIcon, 'g');
    content = content.replace(regex, bsIcon);
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Processed ${file}`);
});
