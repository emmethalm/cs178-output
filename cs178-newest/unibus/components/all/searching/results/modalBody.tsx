/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kwxkhHhYDQd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 * 
 */
"use client";
export function ModalBody() {
  return (
    <div className="relative inset-0 z-10 overflow-y-auto w-full">
      <div className="flex min-h-full items-end justify-center p-4 text-center w-full">
        <div className="relative w-full transform overflow-hidden rounded-t-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
          <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
              Your Ride
            </h3>
            <div className="mt-2 w-full">
              <p className="text-sm text-gray-500">Shuttle Tag</p>
              <p className="text-3xl font-bold text-gray-900"># 576</p>
              <div className="mt-4 flex justify-between w-full">
                <div className="rounded-full bg-gray-200 px-4 py-1 text-sm font-semibold text-gray-700">
                  ETA: 15 minutes
                </div>
              </div>
              <div className="mt-6 w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <CircleIcon className="h-5 w-5 text-gray-900" />
                    <span className="ml-2 text-sm font-semibold text-gray-900">Widener Gate</span>
                    <span className="ml-1 rounded bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700">
                      Next up
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">10:30am</span>
                </div>
                <div className="mt-2 flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <CircleIcon className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm font-semibold text-gray-900">Harvard Square</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">10:36am</span>
                </div>
                <div className="mt-2 flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <CircleIcon className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm font-semibold text-gray-900">Harvard Stadium</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">10:43am</span>
                </div>
                <div className="mt-2 flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <CircleIcon className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm font-semibold text-gray-900">SEC</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">10:45am</span>
                </div>
              </div>
            </div>
            {/* <div className="mt-4">
              <Button variant="light">Close</Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

function CircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}
