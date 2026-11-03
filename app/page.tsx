import Image from "next/image";
export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 my-8 space-y-10">
      {/* Bagian Heading (Di luar CSS Grid) */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold underline w-full">
          Selamat Datang di Belajar NextJS
        </h1>
        <p className="font-bold text-5xl text-justify bg-blue-200 text-red-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ut suscipit placeat voluptatibus a cum, in ad iusto rerum quae!
        </p>
        <p></p>
        <br/>
        <Image src="/next.svg" alt="" width={200} height={200} className='mx-auto'/>
      </div>

      {/* 3 Card Menggunakan CSS Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border-5 border-blue-900 rounded-full shadow-sm shadow-red-500">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Card 1</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ut suscipit placeat voluptatibus a cum.
          </p>
        </div>

        <div className="border-2 border-red-500 rounded-lg shadow-md shadow-green-900">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Card 2</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ut suscipit placeat voluptatibus a cum.
          </p>
        </div>

        <div className="border-10 border-green-900 rounded-sm shadow-xl shadow-red-100">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Card 3</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ut suscipit placeat voluptatibus a cum.
          </p>
          <button className="bg-green-600 p-4 
                rounded-md hover:bg-red-700">
                Hello Geek!
            </button>
            <br></br>
          <button className="bg-blue-500 hover:bg-blue-700 hover:shadow-md transition duration-300 text-white p-2 roundedbg-green-600 p-4 
                           rounded-md focus:bg-green-700">
                Hello Geek!
          </button>
          <button className="bg-green-600 p-4 
                           rounded-md active:bg-green-700">
              Hello Geek!
          </button>

        </div>
      </div>
    </div>
  );
}
