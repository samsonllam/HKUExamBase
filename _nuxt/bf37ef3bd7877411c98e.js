(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{165:function(t,e,a){"use strict";a.r(e);a(57);var s=a(146),r=a.n(s),n={head:{script:[{src:"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"}]},data:function(){return{loading:!1,code:"",errmsg:"",notFoundAlert:!1,headers:[{text:"Code",align:"left",value:"code"},{text:"Title",value:"title",align:"left"},{text:"Exam Date",value:"exam_date",align:"left"},{text:"Department",value:"department",align:"left"},{text:"Remark",sortable:!1,value:"remark"},{text:"Enter",sortable:!1,value:"enter",align:"center"}],pastpaper:[]}},methods:{searchByCode:function(){var t=this,e=this;e.notFoundAlert=!1,null!=e.code&&(e.code=e.code.replace(/\s/g,""),e.loading=!0,e.pastpaper=[],r.a.get("https://hongkonguexambaseapi.herokuapp.com/pastpaper/".concat(e.code)).then(function(a){404==a.data.status?(t.errmsg=a.data.msg,e.notFoundAlert=!0):e.pastpaper=a.data,e.loading=!1}).catch(function(t){e.loading=!1}))}}},o=a(19),l=Object(o.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-layout",{attrs:{column:"","justify-center":""}},[a("v-flex",{attrs:{xs12:"",sm8:"",md6:""}},[a("v-img",{attrs:{gradient:"to top right, rgba(14,180,142, .7), rgba(0,158,214, .7)","aspect-ratio":"2.7",dark:"",src:"https://cdn.vuetifyjs.com/images/parallax/material2.jpg"}},[a("v-container",{attrs:{"fill-height":""}},[a("v-layout",{attrs:{"align-center":""}},[a("v-flex",{attrs:{"text-xs-center":""}},[a("h3",{staticClass:"display-2"},[t._v("HKUExamBase")]),t._v(" "),a("br"),t._v(" "),a("span",{staticClass:"subheading"},[t._v("✨Refined HKUL ExamBase✨")]),t._v(" "),a("br"),a("br"),t._v(" "),a("v-text-field",{attrs:{loading:t.loading,box:"",clearable:"",type:"text",label:"Course Code",color:"rgba(150, 255, 120, 0.8)",placeholder:"COMP2119","append-outer-icon":"search"},on:{"click:append-outer":t.searchByCode},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.searchByCode(e):null}},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)],1)],1)],1),t._v(" "),a("v-alert",{attrs:{value:t.notFoundAlert,type:"error",transition:"scale-transition"}},[t._v("\n      "+t._s(t.errmsg)+"\n    ")]),t._v(" "),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.pastpaper},scopedSlots:t._u([{key:"items",fn:function(e){return[a("td",[t._v(t._s(e.item.code))]),t._v(" "),a("td",{staticClass:"text-xs"},[t._v(t._s(e.item.title))]),t._v(" "),a("td",{staticClass:"text-xs"},[t._v(t._s(e.item.exam_date))]),t._v(" "),a("td",{staticClass:"text-xs"},[t._v(t._s(e.item.department.toString()))]),t._v(" "),a("td",{staticClass:"text-xs-center"},[e.item.remark.length>0?a("v-tooltip",{attrs:{bottom:""}},[a("div",{attrs:{slot:"activator"},slot:"activator"},[a("v-icon",{attrs:{slot:"activator",color:"primary",dark:""},slot:"activator"},[t._v("info")])],1),t._v(" "),a("span",[t._v(t._s(e.item.remark.toString()))])]):t._e()],1),t._v(" "),a("td",{staticClass:"text-xs-center"},[e.item.blocked?t._e():a("a",{attrs:{href:e.item.url,target:"_blank"}},[t._v("\n            Enter\n          ")])])]}}])}),t._v(" "),a("p",[t._v("Data will be collected anonymously in high confidentials for statistical use only")])],1)],1)},[],!1,null,null,null);l.options.__file="index.vue";e.default=l.exports}}]);