import { Button } from '@/components/ui/Button'
import Image from 'next/image'
export default function Home() {
  return (
    <>
      <p className='text-3xl font-bold text-indigo-500'>hello</p>
      <Button
        variant={"secondary"}
      >
        test
      </Button>
    </>
  )
}
