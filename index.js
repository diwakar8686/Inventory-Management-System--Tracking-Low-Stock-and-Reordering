function trackLowStockAndReorder(products) {
    const lowStockProducts = products.filter(product => product.stock < 100);
    const reorderCosts = lowStockProducts.map(product => ({
      name: product.name,
      category: product.category,
      reorderCost: (100 - product.stock) * product.pricePerUnit
    }));
    const reorderByCategory = reorderCosts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = 0;
      }
      acc[product.category] += product.reorderCost;
      return acc;
    }, {});
    const sortedCategories = Object.entries(reorderByCategory)
      .filter(([category, cost]) => cost > 0) 
      .sort((a, b) => b[1] - a[1]);
    const result = Object.fromEntries(sortedCategories);
  
    return result;
  }
  const products = [
    { name: "Laptop", category: "Electronics", stock: 50, pricePerUnit: 1000 },
    { name: "Phone", category: "Electronics", stock: 150, pricePerUnit: 500 },
    { name: "T-shirt", category: "Clothing", stock: 40, pricePerUnit: 20 },
    { name: "Jeans", category: "Clothing", stock: 90, pricePerUnit: 40 },
    { name: "Watch", category: "Accessories", stock: 70, pricePerUnit: 150 }
  ];
  console.log(trackLowStockAndReorder(products));
  