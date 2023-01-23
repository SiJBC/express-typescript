import express, { Request, Response, NextFunction } from 'express';
import axios, {AxiosResponse} from 'axios'
import Handlebars from 'handlebars';
import { engine} from 'express-handlebars'

const app = express()
const port = 3000;

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('home', {
    title: 'HOME'
  } )
})

const getLocationsWithTimezones = (request: Request, response: Response, next: NextFunction) => {
    let locations: LocationWithTimezone[] = [
      {
        location: 'Germany',
        timezoneName: 'Central European Time',
        timezoneAbbr: 'CET',
        utcOffset: 1
      },
      {
        location: 'China',
        timezoneName: 'China Standard Time',
        timezoneAbbr: 'CST',
        utcOffset: 8
      },
      {
        location: 'Argentina',
        timezoneName: 'Argentina Time',
        timezoneAbbr: 'ART',
        utcOffset: -3
      },
      {
        location: 'Japan',
        timezoneName: 'Japan Standard Time',
        timezoneAbbr: 'JST',
        utcOffset: 9
      }
    ];
  
    response.status(200).json(locations);
  };

  interface RandomUIData{
     uid: string,
    password: string,
    firstname: string,
    id: number,
    lastname: string,
    username: string,
    email: string,
    avatar: string,
    gender: string,
    phonenumber: string,
    socialinsurance_number: number
    dateof_birth: string,
    employment: {
    title: string,
    keyskill: string
    },
    address: {
    city: string,
    streetname: string,
    streetaddress: string,
    zipcode: string,
    state: string,
    country: string,
    coordinates: {
    lat: number,
    lng: number
    }
    },
    credit_card: {
    cc_number: string
    },
    subscription: {
    plan: string,
    status: string,
    payment_method: string,
    term: string
    }}
  


interface LocationWithTimezone {
    location: string;
    timezoneName: string;
    timezoneAbbr: string;
    utcOffset: number;
  };

app.get('/timezones', getLocationsWithTimezones);

function returnData(): Promise<AxiosResponse<RandomUIData[], any>>{
  return axios.get('https://random-data-api.com/api/v2/users?size=2&is_xml=true')
}



app.get('/json', async (req: Request, res: Response) => {
    const {data} = await returnData()
    console.log(data[0])
    type dataKeys = keyof typeof data
    res.send(data[0])
})


app.listen(port, () => {
    console.log(`application running on port ${port}`)
})