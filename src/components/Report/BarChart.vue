<template>
  <div>

    <div class="container mt-32 ml-40 w-1/2 h-full ">
    <D3BarChart 
   title="Bar Chart" 
   xKey="name" 
   yKey="amount"
    :data='barChartData'
     
    /></div>
  </div>
  
</template>

<script scoped>


import VueApexCharts from "vue3-apexcharts";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import D3BarChart from "vue-d3-barchart"
export default {
  name: "App",
  components: {
   D3BarChart,
  
  },
  
computed:{
  
},
  setup() {
    
 let goodStanding = ref(
   {
      approved:1,
      declined:1,
      underReview:1
   }
 );
 
 let newLicense = ref(
   {
      approved:1,
      declined:1,
      underReview:1
   }
 );
 
 let renewal = ref(
   {
      approved:1,
      declined:1,
      underReview:1
   }
 );
 
 let verification = ref(
   {
      approved:1,
      declined:1,
      underReview:1
   }
 );
 let checkData=false;
    const store = useStore();
    const updateClicked =()=> {
    
      
    }
const getGoodStanding =  () => {
     store.dispatch("reviewerGoodStanding/getGoodstandingReport").then(res => {
        // var profile= store.getters["profile/getPersonalInfo"];
            goodStanding.value.approved=res[0]==undefined?0:res[0].length;
            goodStanding.value.declined=res[1]==undefined?0:res[1].length;
            goodStanding.value.underReview=res[2]==undefined?0:res[2].length;
            console.log("all good standing ",res);
           
      });
    };
    const getNewLicense = () => {
      store.dispatch("reviewerNewLicense/getNewLicenseReport").then(res => {
        // var profile= store.getters["profile/getPersonalInfo"];
            newLicense.value.approved=res[0]==undefined?0:res[0].length
            newLicense.value.declined=res[1]==undefined?0:res[1].length
            newLicense.value.underReview=res[2]==undefined?0:res[2].length
            console.log("all newLicense ",res);
        
      });
    };
   const getRenewal = () => {
      store.dispatch("reviewerRenewal/getRenewalReport").then(res => {
        // var profile= store.getters["profile/getPersonalInfo"];
            renewal.value.approved=res[0]==undefined?0:res[0].length;
            renewal.value.declined=res[1]==undefined?0:res[1].length;
            renewal.value.underReview=res[2]==undefined?0:res[2].length;
            console.log("all renewal ",res);
         
      });
    };
    const getVerification = () => {
       store.dispatch("reviewerVerification/getVerificationReport").then(res => {
        // var profile= store.getters["profile/getPersonalInfo"];
            verification.value.approved=res[0]==undefined?0:res[0].length;
            verification.value.declined=res[1]==undefined?0:res[1].length;
            verification.value.underReview=res[2]==undefined?0:res[2].length;
            console.log("all verification ",  verification.value.underReview);
            checkData=true;
        
      });
    };
    let cat = ref();
   
    cat = ["new license", "Good standing", "Renewal","Verification"];

 let barChartData= ref();
     
     const getXAxis =()=>
     {
       return cat.value;
     }
 const getYAxis =()=>
     {
       return [goodStanding.value.approved,goodStanding.value.declined,goodStanding.value.underReview];
     }
 barChartData: [
      {
        name: "Roses",
        amount: 25
      },
      {
        name: "Tulips",
        amount: 40
      },
      {
        name: "Daisies",
        amount: 15
      },
      {
        name: "Narcissuses",
        amount: 9
      }
    ]

      onMounted( () => {
     getGoodStanding();
      getNewLicense();
      getRenewal();
       getVerification();
      
    });
     return {
     
      updateClicked,
      checkData,
      getXAxis,
      getYAxis,
      barChartData
    };
  },
  data: function() {
    return {
      //   chartOptions: {
      //     chart: {
      //       id: "vuechart-example",
      //     },
      //     xaxis: {
      //       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      //     },
      //   },
      //   series: [
      //     {
      //       name: "series-1",
      //       data: [30, 40, 35, 50, 49, 60, 70, 91],
      //     },
      //   ],
    };
  }
};
</script>

<style></style>