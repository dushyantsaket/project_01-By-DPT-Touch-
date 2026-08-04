import mongoose from 'mongoose';

const StockMovementSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  type: { type: String, enum: ['purchase', 'sale', 'return', 'adjustment'] },
  quantity: Number,
  previousStock: Number,
  newStock: Number,
  reference: String,
  godownLocation: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.StockMovement || mongoose.model('StockMovement', StockMovementSchema);




// https://accounts.google.com/v3/signin/accountchooser?client_id=185402022199-s5g25nc9npjjqno8pm7jcsm40rnfa2en.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5173&response_type=code&scope=openid+email+profile&dsh=S674885991%3A1784376189720874&o2v=2&service=lso&flowName=GeneralOAuthFlow&opparams=%253F&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hAMN1FsL53vrw_nSexl1AAP5ffAdym821tMuSdrldcKMShqvNBkqqH0WxUK95FQ9X02lsSfKGAHaHB2Xhv2p1-GFrl61vKTPJ4Uk0vdYaOiVApqrjHDyWYO8oomOgvCwY1WsBsBbx4LnRFpzHnIvWDJ0QhL-3rHW1-ZW5lFybxOrBA21N9oAthG0MkOiN3UJKTZoco4OMVS1oLy507ieokQA_WeCegAPLnZdhM0EIwI31WkZmIsjWnfgicgBLWwGisN4QIB1jFqpijJ7jdZs4%26client_id%3D185402022199-s5g25nc9npjjqno8pm7jcsm40rnfa2en.apps.googleusercontent.com%26requestPath%3D%252Fsignin%252Foauth%252Fconsent%23&app_domain=http%3A%2F%2Flocalhost%


// 4%26client_id%3D185402022199-s5g25nc9npjjqno8pm7jcsm40rnfa2en.apps.googleusercontent.com%26requestPath%3D%252Fsignin%252Foauth%252Fconsent%23&app_domain=http%3A%2F%2Flocalhost%3A5173



// 4%26client_id%3D185402022199-s5g25nc9npjjqno8pm7jcsm40rnfa2en