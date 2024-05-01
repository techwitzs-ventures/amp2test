/**
 * Authorization Roles
 */
const authRoles = {
  plateformadmin: ['plateformadmin'],
  seller: ['seller'],
  retailer: ['retailer'],
  forall: ['plateformadmin', 'seller', 'retailer'],
  onlyPlateformAdminAndSeller: ['plateformadmin', 'seller'],
  onlyPlateformAdminAndRetailer: ['plateformadmin', 'retailer'],
  onlyGuest: [],
};

export default authRoles;
