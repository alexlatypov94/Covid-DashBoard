import { FLAGS_API_URL, FLAGS_SIZE, FLAG_STYLE} from "../../../core/constants";

/**
 * COVID19 API Service
 * See more: https://documenter.getpostman.com/view/10808728/SzS8rjbc
 */
export class Flag {
    getFlag(countryCode,size=FLAGS_SIZE[24]) {
        return (`<img ${FLAGS_API_URL}/${countryCode}/${FLAG_STYLE.FLAT}/${size}`)
     }

	}