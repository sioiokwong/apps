function scrollToImpacts() {
    $('html,body').animate({
        scrollTop: $("#impactTopHolder").offset().top - 54
    });
}

function showImpactWidget(menuType, heroMenu, site) {
    var folder = '';

    switch (menuType) {
        case 'parks':
            folder = '/apps/img/impact/land/';
            break;

        case 'feature':
            folder = '/apps/school/';
            break;

        case 'air':
            folder = '';
            break;

        case 'energy':
            folder = '';
            break;
    }

    //heroMenu.air.img = folder + "air.jpg";
    //heroMenu.land.img = folder + "land.jpg";
    //heroMenu.energy.img = folder + "energy.jpg";

    var html = [];
    var i = 0;

    html[i++] = "<style>.impactIcons span{float:left;font-size:16px;padding-right:8px}</style>";
    html[i++] = "<div class='impactIcons'>";
    html[i++] = "<div class='impactIcon_Air' onclick=\"goHash({'set':'air','indicators':'GHG,GCC,MGHG,OGHG,HRSP,OZON,SMOG,HAPS'});scrollToImpacts();\"><span class='material-icons'>air</span> <span>Air</span></div>";
    html[i++] = "<div class='impactIcon_Water' onclick=\"goHash({'set':'water','indicators':'WATR,ACID,EUTR,ETOX'});scrollToImpacts();\"><span class='material-icons'>water_drop</span> <span>Water</span></div>";
    html[i++] = "<div class='impactIcon_Land' onclick=\"goHash({'set':'land','indicators':'LAND,MNRL,PEST,METL,CRHW,CMSW,FMSW,CCDD'});scrollToImpacts();\"><span class='material-icons'>forest</span> <span>Land</span></div>";
    html[i++] = "<div class='impactIcon_Energy' onclick=\"goHash({'set':'energy','indicators':'ENRG,NNRG,RNRG'});scrollToImpacts();\"><span class='material-icons'>lightbulb</span> <span>Energy</span></div>";
    html[i++] = "<div class='impactIcon_Health' onclick=\"goHash({'set':'health','indicators':'HTOX,HCAN,HNCN,HTOX,HRSP'});scrollToImpacts();\"><span class='material-icons'>local_pharmacy</span> <span>Health</span></div>";
    html[i++] = "<div class='impactIcon_Prosperity' onclick=\"goHash({'set':'prosperity','indicators':'VADD,JOBS'});scrollToImpacts();\"><span class='material-icons'>sentiment_satisfied_alt</span> <span>Prosperity</span></div>";
    html[i++] = "</div>";

    $(document).ready(function() {
        $('#insertImpactIcons').html(html.join(''));
    });
}

function showHeroMenu(menuType, menu, site) {

    if (menuType == "custom") {
      menu = {"home":[],"composting":[],"biodiesel":[],"connect":[]}

      menu.home.img = "/apps/school/img/hero/ses.jpg"
      menu.home.page = "/apps/school/"

      menu.composting.img = "/apps/school/img/hero/composting.jpg"
      menu.composting.page = "/apps/composting/"

      menu.biodiesel.img = "/apps/school/img/hero/biodiesel.jpg"
      menu.biodiesel.page = "/apps/biodiesel/"

      menu.connect.img = "/apps/get-involved/ocg-saving-the-ocean_wide.jpg"
      menu.connect.page = "/apps/get-involved/"
    }

    var menuImages = "";
      $.each(menu, function (key, val) {
            //alert(key + val);
            //alert(heroMenu[key].img);
            let pageURL = "";
            if (val.page) {
                pageURL = val.page;
            } else {
                pageURL = val.img;
            }
            menuImages += "<div>";

            menuImages += "<div style='max-height:110px;overflow:hidden'><a href='" + pageURL + "'><img src='" + val.img + "'></a></div>";
            menuImages += key.toUpperCase();
            menuImages += "</div>";
      });
      $(document).ready(function() {
        $("#menuImages").html(menuImages);
      });
}