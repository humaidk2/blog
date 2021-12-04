import { CMS_NAME } from '../lib/constants'

export default function Intro() {
  return (
    <section className="flex-col md:flex-col flex items-center md:justify-between mt-16 mb-16 md:mb-12 ">
      <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        My quiet little corner
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A Tech blog for modern app stuff
      </h4>
      
    </section>
  )
}
