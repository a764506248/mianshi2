export const CART_KEY = 'forme-cart-v1';
export function addLine(cart, productId, color, quantity, stock) {
  const key = `${productId}:${color}`;
  const productQuantity = cart.filter(line => line.productId === productId).reduce((sum,line) => sum + line.quantity, 0);
  const delta = Math.min(Math.max(0, Math.floor(quantity)), Math.max(0, stock - productQuantity));
  if (!delta) return cart;
  const exists = cart.some(line => line.key === key);
  return exists ? cart.map(line => line.key === key ? {...line, quantity:line.quantity+delta} : line) : [...cart,{key,productId,color,quantity:delta}];
}
export function changeQuantity(cart, key, quantity, stock) {
  if (quantity <= 0) return cart.filter(line => line.key !== key);
  const line = cart.find(line => line.key === key);
  if (!line) return cart;
  const others = cart.filter(item => item.productId === line.productId && item.key !== key).reduce((sum,item)=>sum+item.quantity,0);
  return cart.map(item => item.key === key ? {...item,quantity:Math.min(Math.floor(quantity),Math.max(0,stock-others))} : item).filter(item=>item.quantity>0);
}
export function readCart(raw, products) {
  try {
    const parsed = JSON.parse(raw || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.reduce((acc,line) => {
      const p = products.find(p=>p.id===line?.productId);
      if (!p || !p.colors.some(c=>c.name===line.color) || !Number.isInteger(line.quantity) || line.quantity<1) return acc;
      return addLine(acc,p.id,line.color,line.quantity,p.stock);
    },[]);
  } catch { return []; }
}
export function totals(cart, products) {
  const subtotal = cart.reduce((sum,line)=>sum+(products.find(p=>p.id===line.productId)?.price||0)*line.quantity,0);
  const shipping = subtotal===0 || subtotal>=100 ? 0 : 8;
  return {subtotal,shipping,total:subtotal+shipping,count:cart.reduce((sum,line)=>sum+line.quantity,0)};
}
