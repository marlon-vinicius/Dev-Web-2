const { createApp } = Vue;

createApp({
    data(){
        return {
            isMsgAtiva: false,
            isLampOff: false
        }
    },
    methods:{
        toggleMsg: function() {
            this.isMsgAtiva = !this.isMsgAtiva;
        },
        toggleLamp: function() {
            this.isLampOff = !this.isLampOff;
        }
    }
}).mount("#app");