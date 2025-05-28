import Button from "@/Components/Button"

export default function ErrorPage({ status }) {
    const title = {
      503: '503: Service Unavailable',
      500: '500: Server Error',
      404: '404: Page Not Found',
      403: '403: Forbidden',
    }[status]
  
    const description = {
      503: 'Sorry, we are doing some maintenance. Please check back soon.',
      500: 'Whoops, something went wrong on our servers.',
      404: 'Sorry, the page you are looking for could not be found.',
      403: 'Sorry, you are forbidden from accessing this page.',
    }[status]

    const returnBack = () => {
        window.history.back();
    }
  
    return (
      <div className="flex flex-col gap-4 justify-center w-full min-h-screen items-center">
        <div className="max-w-80 md:max-w-xl">

        </div>
        <div className="text-gray-950 font-bold text-lg">{description}</div>
        <Button size="md" onClick={returnBack}>
            Return
        </Button>
      </div>
    )
  }