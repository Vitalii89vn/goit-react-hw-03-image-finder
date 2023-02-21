
const API_KEY = '32359638-7443e20de0ded3dc69cc0faa3';
const BAZE_URL = 'https://pixabay.com/api/';
        
export const FetchPixabay = (query, page)=> {
    return fetch(`${BAZE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        }
                        return Promise.reject(new Error('Sorry, there are no images matching your search query. Please try again.'))
                    })
    
}