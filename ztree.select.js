angular.module('ztree-select', [])
.directive('zTree', ['$http', function($http){
    return {
        restrict: 'EA',
            scope: {
                selectedModel: '=ngModel',
                showZtree: '=',
                sourceData: '='
            },
            templateUrl: './template.html',
         
            link: function(scope, element) {
                var setting = {
                    check: {
                        enable: false,
                        dblClickExpand: false
                    },callback: {
                        onClick : onMouseDown,
                        onMouseUp: onMouseUp,
                    },
                    view: {
                        showLine: true,
                        showIcon: false,
                    }
                };

                scope.$watch('data.showZtree', function(val){
                    if(val){
                         $.fn.zTree.init($('#tree'), setting, scope.sourceData);
                        var treeObj = $.fn.zTree.getZTreeObj('tree'), nodes = treeObj.getNodes();
                      if (nodes.length > 0) {
                        treeObj.expandNode(nodes[0], true, false, false);
                }
                     }
                } )


                //click menu
                function onMouseDown(event, treeId, treeNode) {
                    scope.selectedModel = treeNode.name;
                    if(!scope.$$phase) {
                          scope.$apply();
                    }
                        scope.data.showZtree = false;
                }

                function onMouseUp(){
                    // $scope.showZtree = false;
                }
            }
        }
    }
])