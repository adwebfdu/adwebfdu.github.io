'use strict';

var controllers = angular.module('controllers', []);

//master controller
controllers.controller('masterCtrl', ['$scope', 'DataService', '$route', '$templateCache', '$cookieStore', '$routeParams', '$location',
        function ($scope, DataService, $route, $templateCache, $cookieStore, $routeParams, $location) {
            $scope.title = "城市景观大众点评";
            $scope.backUrl = null;
        }]
);

// controller
controllers.controller('headerCtrl', ['$scope', 'DataService', '$location',
        function ($scope, DataService, $location) {

            $scope.isShowMenu = false;
            var promise = DataService.queryByFile("spotList");
            promise.then(function (data) {
                $scope.spots = data;
            });
            $scope.toggleMenu = function () {
                $scope.isShowMenu = !$scope.isShowMenu;
            }
            $scope.back = function () {
                $location.path($scope.backUrl);
            }
        }]
);

// controller
controllers.controller('homeCtrl', ['$scope', 'DataService', '$location',
        function ($scope, DataService, $location) {
            $scope.currentView = "";
            $scope.isShowReturn = false;
            $scope.isRoute = false;
            var promise = DataService.queryByFile("spotList");
            promise.then(function (data) {
                $scope.spots = data;
            });

            var overlays = [
                {
                    "name": "上海近代公园",
                    "points": [
                        {
                            "x": 116.404,
                            "y": 39.915
                        },
                        {
                            "x": 116.504,
                            "y": 39.815
                        },
                        {
                            "x": 116.604,
                            "y": 39.715
                        }
                    ]
                },
                {
                    "name": "上海工业遗迹",
                    "points": [
                        {
                            "x": 116.804,
                            "y": 39.915
                        },
                        {
                            "x": 116.504,
                            "y": 39.815
                        },
                        {
                            "x": 116.104,
                            "y": 39.715
                        }
                    ]
                }
            ];
            var addMapOverlay = function (index, map) {
                map.clearOverlays();
                var overlay = overlays[index];
                for (var i in overlay.points) {
                    var point = overlay.points[i];
                    var marker = new BMap.Marker(new BMap.Point(point.x, point.y));
                    //var marker = new BMap.Marker(new BMap.Point(116.404, 39.985)); // 创建点
                    map.addOverlay(marker);
                }
            }
            $(function () {
                $("[data-toggle='tooltip']").tooltip();
                $(".overlay-checkbox").each(function (item) {
                    $(this).change(function () {
                        var map = new BMap.Map("my-map");
                        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
                        //addOverlay();
                        var index = parseInt($(this)[0].value);
                        addMapOverlay(index, map);
                    });
                });
            });

            $scope.showView = function (view) {
                if (view == $scope.currentView) {
                    $scope.currentView = "";
                    $scope.isRoute = false;
                } else {
                    $scope.currentView = view;
                    if (view == 'route') {
                        $scope.isRoute = true;
                        var map = new BMap.Map("my-map");
                        var start = "天安门";
                        var end = "百度大厦";
                        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

                        //三种驾车策略：最少时间，最短距离，避开高速
                        var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];

                        //map.clearOverlays();
                        var i = 0;
                        var search = function (start, end, route) {
                            var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, autoViewport: true}, policy: route});
                            driving.search(start, end);
                        }
                        search(start, end, routePolicy[i]);
                        //setTimeout(function(){
                        var marker = new BMap.Marker(new BMap.Point(116.404, 39.985)); // 创建点
                        var attribute = function () {
                            $scope.isShowMarker = true;
                            $scope.$apply();
                        }
                        marker.addEventListener("click", attribute);
                        map.addOverlay(marker);    //增加点


                        //},1000);

                    }
                }
            }
        }]
);

controllers.controller('overviewCtrl', ['$scope', 'DataService', '$location',
    function ($scope, DataService, $location) {
        $("[data-toggle='tooltip']").tooltip();
        $scope.isShowReturn = true;
        $scope.title = "1933老场坊";
        $scope.currentView = "default";
        $scope.isShowMore = false;
        $scope.backUrl = '/';
        $(function(){
            $(".file-upload").change(function(){
                location.href = '/#/detail';
            });
        });
        $scope.showMore = function () {
            $scope.isShowMore = !$scope.isShowMore;
        }
        $scope.addComment = function () {
            if ($scope.currentView == 'comment') {
                $scope.currentView = 'default';
            } else {
                $scope.currentView = "comment";
            }

        }
        $scope.goto = function (target) {
            $location.path(target);
        }
        $scope.showRoute = function () {
            $scope.currentView = "";
            var map = new BMap.Map('my-map');
            var poi = new BMap.Point(116.307852, 40.097031);
            map.centerAndZoom(poi, 16);
            map.enableScrollWheelZoom();
            var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                '<img src="images/spot-demo.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                '地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。' +
                '</div>';

            //创建检索信息窗口对象
            var searchInfoWindow = null;
            searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
                title: "百度大厦",      //标题
                width: 290,             //宽度
                height: 105,              //高度
                panel: "panel",         //检索结果面板
                enableAutoPan: true,     //自动平移
                searchTypes: [
                    BMAPLIB_TAB_SEARCH,   //周边检索
                    BMAPLIB_TAB_TO_HERE,  //到这里去
                    BMAPLIB_TAB_FROM_HERE //从这里出发
                ]
            });
            var marker = new BMap.Marker(poi); //创建marker对象
            marker.enableDragging(); //marker可拖拽
            marker.addEventListener("click", function (e) {
                searchInfoWindow.open(marker);
            })
            map.addOverlay(marker); //在地图中添加marker
        }
    }
]);

controllers.controller('detailCtrl', ['$scope', 'DataService', '$location',
    function ($scope, DataService, $location) {
        $("[data-toggle='tooltip']").tooltip();
        $scope.isShowReturn = true;
        $scope.title = "1933老场坊";
        $scope.backUrl = 'overview';
        $(function () {
            var camera, scene, renderer;
            var mesh;
            init();
            animate();
            function init() {
                camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
                camera.position.z = 400;
                scene = new THREE.Scene();
                var texture = new THREE.TextureLoader().load('images/crate.gif');
                var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
                var material = new THREE.MeshBasicMaterial({ map: texture });
                mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio(window.devicePixelRatio);
                //renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setSize(80,80);
                document.getElementById("3d").appendChild(renderer.domElement);
                //
                window.addEventListener( 'resize', onWindowResize, false );
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                //renderer.setSize(window.innerWidth, window.innerHeight);
            }

            function animate() {
                requestAnimationFrame(animate);
                mesh.rotation.x += 0.005;
                mesh.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
        });
    }
]);

controllers.controller('3dCtrl', ['$scope', 'DataService', '$location',
    function ($scope, DataService, $location) {
        $("[data-toggle='tooltip']").tooltip();
        $scope.isShowReturn = true;
        $scope.title = "1933老场坊";
        $scope.backUrl = 'overview';

        $(function () {
            var camera, scene, renderer;
            var mesh;
            init();
            animate();
            function init() {
                camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
                camera.position.z = 400;
                scene = new THREE.Scene();
                var texture = new THREE.TextureLoader().load('images/crate.gif');
                var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
                var material = new THREE.MeshBasicMaterial({ map: texture });
                mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                document.getElementById("3d").appendChild(renderer.domElement);
                //
                //window.addEventListener( 'resize', onWindowResize, false );
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            function animate() {
                requestAnimationFrame(animate);
                mesh.rotation.x += 0.005;
                mesh.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
        });
    }
]);

controllers.controller('commentCtrl', ['$scope', 'DataService', '$location',
    function ($scope, DataService, $location) {
        $("[data-toggle='tooltip']").tooltip();
        $scope.backUrl = 'overview';
        $scope.isShowReturn = true;
        $scope.title = "1933老场坊";
        $scope.currentView = 'activity';
        $scope.isComment = false;
        $scope.showView = function (opt) {
            $scope.currentView = opt;
            if (opt == 'question') {
                $scope.isQuestion = true;
                $scope.isComment = false;
            }
        }
        $scope.enableComment = function () {
            $scope.isComment = true;
            $scope.isQuestion = false;
            $scope.currentView = 'activity';
        }
        $(function () {
            $(".comment-item", ".home-view").draggable({
                cancel: "a.ui-icon", // clicking an icon won't initiate dragging
                //revert: "invalid", // when not dropped, the item will revert back to its initial position
                containment: "document",
                helper: "clone",
                cursor: "move",
                stop: function (event) {
                    //console.log(event);
                    var color = $(this).find(".comment-icon").css("background-color");
                    ctx.beginPath();
                    ctx.arc(event.pageX, event.pageY, 9, 0, 360, false);
                    ctx.fillStyle = color;//填充颜色,默认是黑色
                    ctx.fill();//画实心圆
                    ctx.closePath();
                }
            });

            var c = document.getElementById("my-map");
            c.width = $(window).width();
            c.height = $(window).height();
            var ctx = c.getContext("2d");
            var image = new Image();
            image.src = 'images/map-bg.png';
            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            }
            c.addEventListener("mousedown", function (event) {

            });
            c.addEventListener("mouseup", function (event) {

            });
        });
    }
]);
