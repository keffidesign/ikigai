export const getIsProduction = () => process.env.NODE_ENV === 'production';

log(`isProduction`, getIsProduction());
