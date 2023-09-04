import '../BrowsePage.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Creativepage = () => {
    const products = [
        
        {
            name: 'COURSE',
            color: 'After Effects: Using Expressions',
            price: 'By: Luisa Winters',
            imageSrc: 'https://media.licdn.com/dms/image/C4E0DAQE84AgCpYxX-Q/learning-public-crop_144_256/0/1678908578362?e=1692212400&v=beta&t=0gWnv8lmjYUq5u3Qe4p1C5fZbLYYnzA3yPsP7CTR5LA'
        },
        {
            name: 'COURSE',
            color: 'After Effects: Using Expressions',
            price: 'By: Luisa Winters',
            imageSrc: 'https://f8-zpc.zdn.vn/4985019956753817370/33d1cdd5156cc6329f7d.jpg'
        },
        {
            name: 'COURSE',
            color: 'After Effects: Using Expressions',
            price: 'By: Luisa Winters',
            imageSrc: 'https://f8-zpc.zdn.vn/4985019956753817370/33d1cdd5156cc6329f7d.jpg'
        },
        {
            name: 'COURSE',
            color: 'After Effects: Using Expressions',
            price: 'By: Luisa Winters',
            imageSrc: 'https://media.licdn.com/dms/image/D560DAQG9VyhnmRNFyA/learning-public-crop_144_256/0/1687374541931?e=1692212400&v=beta&t=EgzhTM4gdoTNQSxtDC1IypzFpm9BGLcT3ZBK83cVGdA'
        },
        {
            name: 'COURSE',
            color: 'After Effects: Using Expressions',
            price: 'By: Luisa Winters',
            imageSrc: 'https://media.licdn.com/dms/image/C560DAQEayGdFL5OhhQ/learning-public-crop_144_256/0/1675884235222?e=1692212400&v=beta&t=aq5AI8conYMXXoHPhm57YtraUp6P3R0inDlsOx-O_jU'
        },
        {
            name: 'COURSE',
            color: 'After Effects: Using Expressions',
            price: 'By: Luisa Winters',
            imageSrc: 'https://media.licdn.com/dms/image/C4E0DAQGdrDxOMG6FBg/learning-public-crop_144_256/0/1679097853060?e=1692212400&v=beta&t=h1wYf40djVUdc25wocJA4wK8uci6QCCSTKSB97KJpg4'
        },

    ];

    const settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };


    return (
        <div className="containerCss-browepage  business">
            <h2 className='h2-bsn'>Creative</h2>
            <br />
            <h2 className='h2-bsn2'>Role Guides</h2>
            <span className='sp1-bsn'>Explore foundational content and tools to help you understand, learn, and improve at the skills involved in trending industry roles.</span>
            <hr />

            <div className="listbsn">
                <div className="bsn-children">
                    <a href="">Project Manager</a>
                </div>
                <div className="bsn-children bg-yellow-200">
                    <a href="">Project Manager</a>
                </div>
                <div className="bsn-children bg-green-200">
                    <a href="">Project Manager</a>
                </div>
                <div className="bsn-children bg-lime-300">
                    <a href="">Project Manager</a>
                </div>
            </div>

            <div className="bsn-flex-h2">
                <div> <h2 className='h2-bsn2'>Learning Paths</h2></div>
                <div><a href="#" className='text-blue-800 font-medium show-all'>Show All</a></div>
            </div>
            <hr />
            <div className="product-slider2 business-slider">
                <Slider {...settings}>
                    {products.map((product, index) => (

                        <div key={index} className="group relative">
                            <div className="aspect-h-1 product-hp aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 product-slide2">
                                <img src={product.imageSrc} alt="" />
                            </div>
                            <div className="mt-2">
                                <div>
                                    <h3 className="text-xs text-gray-700">
                                        <a href="#">
                                            <span className="absolute inset-2 popular">POPULAR</span>
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-base">{product.color}</p>
                                </div>
                                <p className=" mt-1 text-xs text-gray">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <h2 className='h2-bsn2'>Software</h2>
            <hr />
            <div className="list-software">
                <div className='list-softchi'><a href="">Photoshop</a></div>
                <div className='list-softchi'><a href="">Illustrator</a> </div>
                <div className='list-softchi'><a href="">InDesign</a></div>
                <div className='list-softchi'><a href="">Revit</a></div>
                <div className='list-softchi'><a href="">AutoCAD</a> </div>
                <div className='list-softchi'><a href="">SOLIDWORKS</a></div>
                <div className='list-softchi'><a href="">3ds Max</a></div>
                <div className='list-softchi'><a href="">SketchUp</a></div>
                <div className='list-softchi'><a href="">PowerPoint</a> </div>
                <div className='list-softchi'><a href="">Canva</a></div>
                <div className='list-softchi'><a href="">After Effects</a></div>
                <div className='list-softchi'><a href="">AutoCAD</a> </div>
                <div className='list-softchi'><a href="">SOLIDWORKS</a></div>
                <div className='list-softchi'><a href="">Premiere Pro</a></div>
            </div>
        </div>
    )

};

export default Creativepage;
