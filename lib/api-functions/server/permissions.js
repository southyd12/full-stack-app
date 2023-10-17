const settings = Object.freeze({
  identifier: "https://full-stack-gwrs352d6-southyd12.vercel.app",
  rolesPath: '/roles',
  permissionsPath: '/user_authorization',
  roles: {
    admin: "Admin Shop"
  },
  permissions: {
    baskets: {
      create: "baskets:create",
      read: "baskets:read",
      update: "baskets:update",
      remove: "baskets:delete",
    },
    orders: {
      create: "orders:create",
      read: "orders:read",
      update: "orders:update",
      remove: "orders:delete",
    },
    products: {
      create: "products:create",
      read: "products:read",
      update: "products:update",
      remove: "products:delete",
    }
  },
});

export default settings;