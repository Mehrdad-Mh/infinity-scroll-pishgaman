
let currentPage = 1;
const limit = 10;
let total = 0;

    let factsEl = document.querySelector('.qoutes');
    let loader = document.querySelector('.loader');

    const getfacts = async (page , limit) => {

        const API_URL = `https://catfact.ninja/facts?page=${page}&limit=${limit}`;
        const res = await fetch(API_URL);
    
        if(!res.ok){
            throw new Error (`error dari ${res.status}`)
        }
    
        return await res.json();
    }

    const showfacts = (facts) => {
        facts.forEach(fact => {
            const factEl = document.createElement('blockfact');
            factEl.classList.add('fact');
    
           factEl.innerHTML=
          `${fact.fact}`;
            factsEl.appendChild(factEl)
        });
    };

    const hideLoader = () => {
        loader.classList.remove('show');
    };
    
    const showLoader = () => {
        loader.classList.add('show');
    };

    const hasMorefacts = (page, limit, total) => {
        const startIndex = (page - 1) * limit + 1;
        return total === 0 || startIndex < total;
    };

    const loadfacts = async (page ,limit) => {
        showLoader()
       
            try{
                if(hasMorefacts(page,limit,total)){
                    const res = await getfacts(page, limit);
                    showfacts(res.data);
                    total = res.total;
                }
            }catch(err){
                console.log(err , 'load qoutes err')
            }finally{
                hideLoader();
            }
        
      };

      window.addEventListener('scroll' , ()=>{
        const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
    
        if(scrollTop + clientHeight >= scrollHeight -5 &&
            hasMorefacts(currentPage , limit , total)){
                currentPage++;
                loadfacts(currentPage , limit);
            }
      },{
        passive:true
      });

      loadfacts(currentPage , limit);
















//   try{
//     if(hasMoreQuotes(page,limit,total)){
//         const res = await getQoutes(page , limit);
//         showQoutes(res.data);
//         total = res.total
//     }
//   }catch(err){
//     console.log(err.message, 'err happend')
//   }finally{
//     hideLoader();
//   };





   







