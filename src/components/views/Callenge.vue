<template>
    <div id="guanxi" style="width:100%;height:800px">
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
    mounted(){
        this.guanxi();
    },
    methods:{
        guanxi(){
            let myChart = echarts.init(document.getElementById('guanxi'));
            let nodes = [{"color": "#4f19c7", "label": "基础题", "attributes": {}, "y": -734.4221, "x": -75.53079, "id": "基础题", "size": 100.0},
                        {"color": "#c71969", "label": "二分", "attributes": {},  "y": -682.1726, "x": -479.44443, "id": "二分", "size": 43.21858},
                        {"color": "#c71919", "label": "三分", "attributes": {}, "y": 294.88266, "x": -933.4234, "id": "三分", "size":19.818306},
                        {"color": "#8419c7", "label": "优化", "attributes": {}, "y": 858.8598, "x": 313.5104, "id": "优化", "size": 43.21858},
                        {"color": "#1984c7", "label": "KMP", "attributes": {}, "y": -400.4116, "x": 864.7834, "id": "KMP", "size": 43.21858},
                        {"color": "#c79f19", "label": "字符串", "attributes": {}, "y": -542.05096, "x": 502.02698, "id": "字符串", "size": 19.818306},
                        {"color": "#19c719", "label": "入门", "attributes": {}, "y": -1302.119, "x": 501.15656, "id": "入门", "size": 43.21858},
                        {"color": "#c719b9", "label": "模拟", "attributes": {}, "y": 263.6715, "x": 880.9455, "id": "模拟", "size": 19.818306},
                        {"color": "#3419c7", "label": "马拉车", "attributes": {}, "y": -328.63486, "x": 600.7924, "id": "马拉车", "size":19.818306},
                        {"color": "#c78419", "label": "ac自动机", "attributes": {}, "y": 463.22067, "x": -290.9267, "id": "ac自动机", "size": 43.21858},
                        {"color": "#b9c719", "label": "后缀数组", "attributes": {}, "y": -216.35048, "x": 23.50861, "id": "后缀数组", "size":19.818306},
                        {"color": "#c78419", "label": "排序", "attributes": {}, "y": 174.10605, "x": 1250.3047, "id": "排序", "size": 43.21858},
                        {"color": "#1934c7", "label": "高级排序", "attributes": {}, "y": -150.56572, "x": -237.81726, "id": "高级排序", "size": 19.818306}];
            let edges = [{"sourceID": "基础题", "attributes": {}, "targetID": "入门", "size": 1},
                        {"sourceID": "入门", "attributes": {}, "targetID": "二分", "size": 1},
                        {"sourceID": "二分", "attributes": {}, "targetID": "三分", "size": 1},
                        {"sourceID": "入门", "attributes": {}, "targetID": "优化", "size": 1},
                        {"sourceID": "入门", "attributes": {}, "targetID": "KMP", "size": 1},
                        {"sourceID": "KMP", "attributes": {}, "targetID": "字符串", "size": 1},
                        {"sourceID": "入门", "attributes": {}, "targetID": "模拟", "size": 1},
                        {"sourceID": "模拟", "attributes": {}, "targetID": "马拉车", "size": 1},
                        {"sourceID": "入门", "attributes": {}, "targetID": "ac自动机", "size": 1},
                        {"sourceID": "ac自动机", "attributes": {}, "targetID": "后缀数组", "size": 1},
                        {"sourceID": "入门", "attributes": {}, "targetID": "排序", "size": 1},
                        {"sourceID": "排序", "attributes": {}, "targetID": "高级排序", "size": 1}];
            let jsondata = {"nodes":nodes,"edges":edges};
            let option = {
                title: {
                    text: '挑战关系图',
                    top: 50,
                    left: 50
                },
                animationDuration: 2000,
                animationEasingUpdate: 'quinticInOut',
                series : [
                    {
                        type: 'graph',
                        layout: 'none',
                        data: jsondata.nodes.map(function (node) {
                            return {
                                x: node.x,
                                y: node.y,
                                id: node.id,
                                name: node.label,
                                symbolSize: node.size,
                                itemStyle: {
                                    normal: {
                                        color: node.color
                                    }
                                }
                            };
                        }),
                        edges: jsondata.edges.map(function (edge) {
                            return {
                                source: edge.sourceID,
                                target: edge.targetID
                            };
                        }),
                        roam: true,
                        focusNodeAdjacency: true,
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 1,
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        },
                        label: {
                            emphasis: {
                                position: 'right',
                                show: true
                            }
                        },
                        lineStyle: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
}
</script>

<style scoped>

</style>
