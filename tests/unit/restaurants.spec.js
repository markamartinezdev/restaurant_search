import { mount } from '@vue/test-utils'
import Restaurants from '@/components/restaurants/Restaurants'

describe('Restaurants.vue', () => {
  it('Renders all restaurants from list', () => {
    // Given
    const restaurants = 
    [
      {"id":99976,"name":"Magoo's Pub & Eatery","address":"1-A W. 2nd Street","city":"Frederick","state":"MD","area":"Washington, D.C. Area","postal_code":"21701","country":"US","phone":"3013782237","lat":39.416605,"lng":-77.410678,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=99976","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=99976","image_url":"https://www.opentable.com/img/restimages/99976.jpg"},
      {"id":107326,"name":"Mago Grill & Cantina - South Barrington","address":"100 W Higgins Rd, Suite M05","city":"South Barrington","state":"IL","area":"Chicago / Illinois","postal_code":"60010","country":"US","phone":"8478444400x","lat":42.074974,"lng":-88.189151,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=107326","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=107326","image_url":"https://www.opentable.com/img/restimages/107326.jpg"},
      {"id":64654,"name":"Mago Grill & Cantina - Bolingbrook","address":"641 E Boughton Rd","city":"Bolingbrook","state":"IL","area":"Chicago / Illinois","postal_code":"60440","country":"US","phone":"6307832222","lat":41.720278,"lng":-88.044395,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=64654","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=64654","image_url":"https://www.opentable.com/img/restimages/64654.jpg"},
      {"id":47050,"name":"Mago Grill & Cantina - Arlington Heights","address":"115 West Campbell Street","city":"Arlington Heights","state":"IL","area":"Chicago / Illinois","postal_code":"60005","country":"US","phone":"8472532222","lat":42.082831,"lng":-87.984321,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=47050","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=47050","image_url":"https://www.opentable.com/img/restimages/47050.jpg"}
    ]

    const numberOfRestaurants = restaurants.length
    
    // When
    const wrapper = mount(Restaurants, {
      propsData: { restaurants }
    })

    // Should
    expect(wrapper.findAll('.restaurant').length).toBe(numberOfRestaurants)
  })
})
