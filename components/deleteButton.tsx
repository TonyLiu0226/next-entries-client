import { useRouter } from 'next/navigation'
import {Button} from 'flowbite-react'
import { PostProps } from '@/interfaces/postProps';


const DeleteButton = (props : PostProps) => {

const router = useRouter();

    const deletePost = (id: Number, user:string) => {
      try {
        console.log(user)
        const result = fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE}delete_post`, {
          method: 'DELETE',
          headers:{'content-type': 'application/json'},
          body: JSON.stringify({
            user: user,
            id: id
          }),
        })
        return result;
      }
      catch(e) {
        console.error(e);
        return e;
      }
    }

    return(
        <Button color="failure" onClick={() => {deletePost(props.id, props.user); router.push('/')}}>
          DELETE POST
          <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
    )
}

export default DeleteButton