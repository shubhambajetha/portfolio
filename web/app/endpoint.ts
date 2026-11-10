export const endpoints = {
    listingcategory: {
        createlisting: '/api/listings',
        getlisting: '/api/listings',
        getsinglelisting: (id: string) => `/api/listings/${id}`,
        updatelisting: (id: string) => `/api/listings/${id}`,
        deletelisting: (id: string) => `/api/listings/${id}`,
    },
    detailscategory:{
        createdeatils:(id:string)=>`/api/listings/${id}/details`,
        getdeatils:(id:string)=>`/api/listings/${id}/details`,
        getalldeatils: `/api/project-details`,
        updatedetails:(id:string)=>`/api/listings/${id}/details`,
        deletedeatils:(id:string)=>`/api/listings/${id}/details`
    },
    experince:{
        createexperience: '/api/experience',
        getallexperience: '/api/experience',
        updateexperience: (id: string) => `/api/experience/${id}`,
        deleteexperience: (id: string) => `/api/experience/${id}`,
    }

}
