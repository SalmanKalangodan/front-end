import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { Cart } from '../../../Redux/SearchSlice/SearchSlice'
import { CartDecrement, CartIncrement, CartTotal, DeleteCart, Getcart } from '../../../Redux/ApiSlice/Tunk/Tunk'
import { Link } from 'react-router-dom'


export default function Example() {
  const [cartdata , setCartdata] = useState()
  const cart = useSelector((state)=>state.SearchSlice.Cart)
  const [Total , setTotal] = useState(0)
  const dispacth =useDispatch()
 
  useEffect(()=>{
    dispacth(Getcart()).then((res)=>{
        setCartdata(res.payload)
    })

    dispacth(CartTotal()).then((res)=>{
      setTotal(res.payload)
    })
  
  },[cartdata , dispacth , cart , Total])
  
  
  const HandleDelete = (id) => {
    dispacth(DeleteCart(id))
  }

  const HandleIncrement =(id)=>{
    dispacth(CartIncrement(id))
  }

  const HandleDecrement = (id) =>{
    dispacth(CartDecrement(id))
  }
  
  return (
    <Transition.Root show={cart} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={()=>cart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => dispacth(Cart(false))}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartdata?.map((product) => (
                              <li key={product.productId?._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.productId?.image}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.productId?.title}</a>
                                      </h3>
                                      <p className="ml-4">MRP : ₹{product.productId?.price * product?.qnt}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product?.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <button className='btn' onClick={()=>HandleDecrement(product.productId._id)} >-</button>
                                    <p className="text-gray-500">Qty {product?.qnt}</p>
                                    <button className='btn' onClick={()=>HandleIncrement(product.productId?._id)} >+</button>
                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                     onClick={()=>HandleDelete(product?.productId._id)} >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹ {Total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                     <Link to={"/address"} onClick={()=>dispacth(Cart(false))}> <div className="mt-6" >
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div></Link>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => dispacth(Cart(false))}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

