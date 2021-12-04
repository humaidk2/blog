import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'
import { faAngellist, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2 dark:bg-gray-800 dark:text-white">
      <Container>
        <div className="py-28 flex flex-row lg:flex-col items-center">
    <div className="flex flex-row lg:flex-row justify-around items-around lg:pl-2 lg:w-1/3">
      <div className="h-16 w-16 transition duration-500 ease-in-out hover:bg-black  rounded-full text-sm flex justify-center items-center "><a target="_blank"  href="https://angel.co/humaidk2"><FontAwesomeIcon className="h-8 w-8" icon={faAngellist}/></a></div>
     <div className="h-16 w-16 transition duration-500 ease-in-out hover:bg-black  rounded-full text-sm flex justify-center items-center "><a target="_blank"  href="https://github.com/humaidk2"><FontAwesomeIcon className="h-8 w-8" icon={faGithub}/></a></div>
     <div className="h-16 w-16 transition duration-500 ease-in-out hover:bg-black rounded-full text-sm flex justify-center items-center "><a target="_blank"  href="https://linkedin.com/in/humaidk2"><FontAwesomeIcon className="h-8 w-8" icon={faLinkedin}/></a></div>
     <div className="h-16 w-16 transition duration-500 ease-in-out hover:bg-black rounded-full text-sm flex justify-center items-center "><a target="_blank"  href="mailto:humaidk2@gmail.com"><FontAwesomeIcon className="h-8 w-8" icon={faEnvelope}/></a></div>
     <div className="h-16 w-16 transition duration-500 ease-in-out hover:bg-black  rounded-full text-sm flex justify-center items-center "><a target="_blank" className="icon-link fa-stack fa-lg" href="https://humaidkhan.com"><img className="h-12 w-8" src="/assets/logo9.png" /></a></div>
    </div>
  </div>
      </Container>
    </footer>
  )
}
