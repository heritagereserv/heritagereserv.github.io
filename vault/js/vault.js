var app = new Vue({
    el: '#app',
    data: {
        vaultNumber: null,
        apiUrl: 'https://www.securelte.cc/api/vaults/verify/',
        profile: [],
        vault: [],
        address: [],
        errorMessage: null,
    },
    methods: {
        submitForm () {
            if(this.validateForm()) {
                this.processForm();
            } else {
                document.getElementById('error').className = 'block text-black mb-6 tracking-widest'
                document.getElementById('error').innerHTML = 'Vault number required';
            }

        },

        validateForm () {
           if (this.vaultNumber) {
               return true;
           }
        },

        processForm () {
            document.getElementById('loading').className = 'block tracking-widest text-green-700 mb-6';
            document.getElementById('error').className = 'hidden';

            // console.log(this.apiUrl  + this.vaultNumber)
            
            axios.get(this.apiUrl + this.vaultNumber)
            
                .then((res) => {

                    document.getElementById('loading').className = 'hidden';

                    if(!res.data.success) {
                        this.errorMessage = res.data.message
                        document.getElementById('error').className = 'block text-black mb-6 tracking-widest'
                        document.getElementById('error').innerHTML = this.errorMessage

                    } 
                    
                    
                    
                        // console.log(res)
                        
                    
                    if(res.data.success) {
                    
                    //console.log(res);

                        this.profile = res.data.data.profile;
                        this.vault = res.data.data.vault;
                        this.address = res.data.data.address;

                        // console.log(res);

                        // document.getElementById('error').className = 'hidden'
                    
                        document.getElementById('error').className = 'block text-black mb-6 tracking-widest'
                        document.getElementById('error').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-check inline-block pr-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg> Redirecting in 5 seconds...'

                        setTimeout(function () {
                            
                            document.getElementById('login-form').className = 'hidden'
                            
                            document.getElementById('result-container').className = 'block'
                        
                        }, 4000);
                    }

                
            })
            .catch(function (err) {
                console.log(err)
            })
            .then(function () {
              // always executed
            });

            // return false
        }

    }
});