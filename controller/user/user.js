const bcrypt  = require('bcrypt');
const { update } = require('../../models/user/user');
const User    = require('../../models/user/user');
const wallet  = require('../../models/user/wallet');

const Sequelize   = require('../module');

module.exports = {
  info: async function(data){
    try {
      const userInfo = await User.findByPk(data.USER_ID,{
        attributes: {
          exclude: ['USER_PASS'], // exclude: 제외한 나머지 정보 가져오기
        },
        raw : true
      });
      if(!userInfo)return false;
      return userInfo;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  wallet: async function(ID){
    try {
      const response = await wallet.findByPk(ID,{raw : true});
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  walletUpdate: async function(data){
    try {
      let response = false;
      await wallet.findByPk(data.USER_ID)
      .then(async function(res) {
        response = {
          Private_key:  data.Private_key,
          Public_key:   data.Public_key
        }
        res.update({
          Private_key:  data.Private_key,
          Public_key:   data.Public_key
        });        
      });
      
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  IDCheck: async function(ID){
    try {
      let passFail = false;
      const object = await User.findOne({ where: { USER_ID: ID },raw:true});
      if(object) passFail = true;
      return passFail;
    } catch (error) {
      console.error(error);
      return false;
    }    
  },

  EmailCheck: async function(EMAIL){
    try {
      let passFail = false;
      const object = await User.findOne({ where: { USER_EMAIL: EMAIL },raw:true});
      if(object) passFail = true;
      return passFail;
    } catch (error) {
      console.error(error);
      return false;
    }    
  },

  join: async function(data){
    const t = await Sequelize.transaction();
    try {
      
      console.log(data);
      /*
      data = {
        USER_ID:,
        USER_NAME:,
        USER_PASS:,
        USER_EMAIL:,
        USER_PHONE:,
        USER_ADRESS:,
        TOKEN:
      }
      */
      await wallet.create({
        USER_ID:      data.USER_ID,
        Private_key:  "null",
        Public_key:   "null",
      });
      const hash = await bcrypt.hash(data.USER_PASS, 12);
      await User.create({
        USER_ID:      data.USER_ID,
        USER_NAME:    data.USER_NAME,
        USER_PASS:    hash,
        USER_EMAIL:   data.USER_EMAIL,
        USER_PHONE:   data.USER_PHONE,
        USER_ADRESS:  data.USER_ADRESS,
        TOKEN:        data.TOKEN
      });
      await t.commit();
      return true;
    } catch (error) {
      console.error(error);
      await t.rollback();
      return false;
    }    
  },

  passChange: async function(data){
    try {
      /*
      data = {
        USER_ID,
        USER_PASS:,
      }
      */
      const hash = await bcrypt.hash(data.USER_PASS, 12);
      await User.update(
        { 
          USER_PASS:  data.USER_NEW_PASS
        },
        { where: { USER_ID : data.USER_ID }}
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }    
  },

  passCheck: async function(data){
    try {
      /*
      data = {
        USER_ID,
        USER_PASS:,
      }
      */
      let passFail = false;
      await User.findByPk(data.USER_ID,{
        attributes: ['USER_PASS'],
        raw : true
      })
      .then(async function(responce){
        passFail = await bcrypt.compare(data.USER_PASS,responce.USER_PASS);
      });
      return passFail;
    } catch (error) {
      console.error(error);
      return false;
    }    
  }


}
