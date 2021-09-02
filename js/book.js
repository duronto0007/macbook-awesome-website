const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("search-btn");
const bookContainer = document.getElementById('book-container');
const errorHandling = document.getElementById('error-handling');

searchButton.addEventListener('click', function(){
                const search = searchInput.value;
                // Error Handling 
                if( search === ""){
                    errorHandling.innerText = "Search Field can not be empty"
                    return;
                }
                errorHandling.innerText ='';
                bookContainer.innerHTML = '';
                
                const url = `https://openlibrary.org/search.json?q=${search}`;
                fetch(url)
                .then((res) => res.json())
                .then((data) => displayData(data));
            });

const displayData = (data) =>{
                    // Error Handling
                    if (data.numFound  === 0){
                            errorHandling.innerText = "NO result found"
                        }
                        else{
                            errorHandling.innerText = `Total found: ${(data.docs).length}`
                            data.docs.forEach((item) => {
                                const div = document.createElement('div');
                                div.classList.add('col-md-4');
                                div.innerHTML = `
                                <div class="border border-5 p-3 mt-3 rounded">
                                <div class =" rounded overflow-hidden ">
                                <img src='https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg' class="img-fluid  mx-auto d-block"  alt="" />
                                </div>
                                <div class = " py-2 d-flex justiy-content-between align-items-center d-md-block text-md-center"> 
                                <h5>Book Name:'${item.title}' </h5>
                                <h5>Author:${item.author_name}  </h5>
                                <H5>First publish Year: ${item.first_publish_year} </h5>
                                </div>
                                </div>
                                `;
                                bookContainer.appendChild(div);
                                searchInput.value = '';
                            })
                        }
                        }
                    

            