angular.module('auto-biz-user')
    .filter('companyTypeFilter', function() {
  return function(input) {
    //CM汽车制作，CG汽车零部件，CS汽车销售与服务，NEC新能源汽车，NOC车联网，CC车用化工品，CE汽车金融，PT公共交通，MOC汽车媒体
    if(input=="CM") return "汽车制造";
    else if(input=="CG") return "汽车零部件";
    else if(input=="CS") return "汽车销售与服务";
    else if(input=="NEC") return "新能源汽车";
    else if(input=="NOC") return "车联网";
    else if(input=="CC") return "车用化工品";
    else if(input=="CE") return "汽车金融";
    else if(input=="PT") return "公共交通";
    else if(input=="MOC") return "汽车媒体";
    else return "未知";
  };
});