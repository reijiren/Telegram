import styles from '../styles/Home.module.css'
import Link from "next/link";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={`d-flex flex-row ${styles.talent}`}>
        <div className={`d-flex flex-column justify-content-center w-50`}>
          <h1>Talenta terbaik negeri untuk perubahan revolusi 4.0</h1>
          <p className='my-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
          <Link href={"/home"}><button className={`${styles.hire} text-white rounded-1`}>Mulai Dari Sekarang</button></Link>
        </div>
        <div className='d-flex w-50 justify-content-center'>
          <Image src={'/Group 1195.png'} width={400} height={400} alt="Group 1195" />
        </div>
      </div>
      <div className={`d-flex flex-row ${styles.alasan}`}>
        <div className='d-flex w-50 justify-content-center'>
          <Image src={'/banner 2.png'} width={400} height={400} alt="banner 2" />
        </div>
        <div className={`d-flex flex-column justify-content-center w-50`}>
          <h1>Kenapa harus mencari talent di Peworld</h1>
          <div className='d-flex flex-row my-2'>
            <div className={`${styles.check} rounded-circle text-white`}><FontAwesomeIcon icon={faCheck} /></div>
            <div className='mx-3'>Lorem ipsum dolor sit amet.</div>
          </div>
          <div className='d-flex flex-row my-2'>
            <div className={`${styles.check} rounded-circle text-white`}><FontAwesomeIcon icon={faCheck} /></div>
            <div className='mx-3'>Lorem ipsum dolor sit amet.</div>
          </div>
          <div className='d-flex flex-row my-2'>
            <div className={`${styles.check} rounded-circle text-white`}><FontAwesomeIcon icon={faCheck} /></div>
            <div className='mx-3'>Lorem ipsum dolor sit amet.</div>
          </div>
          <div className='d-flex flex-row my-2'>
            <div className={`${styles.check} rounded-circle text-white`}><FontAwesomeIcon icon={faCheck} /></div>
            <div className='mx-3'>Lorem ipsum dolor sit amet.</div>
          </div>
        </div>
      </div>
      <div className={`d-flex flex-row ${styles.alasan}`}>
        <div className='d-flex flex-column w-50'>
          <div className={`d-flex flex-column justify-content-center`}>
            <h1>Skill Talent</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
            <div className='d-flex flex-row justify-content-around'>
              <div className='d-flex flex-column'>
                <div className='d-flex flex-row my-2'>
                  <div className={`${styles.check} rounded-circle text-white bg-orange`}><FontAwesomeIcon icon={faCheck} /></div>
                  <div className='mx-3'>Java</div>
                </div>
                <div className='d-flex flex-row my-2'>
                  <div className={`${styles.check} rounded-circle text-white bg-orange`}><FontAwesomeIcon icon={faCheck} /></div>
                  <div className='mx-3'>Kotlin</div>
                </div>
                <div className='d-flex flex-row my-2'>
                  <div className={`${styles.check} rounded-circle text-white bg-orange`}><FontAwesomeIcon icon={faCheck} /></div>
                  <div className='mx-3'>PHP</div>
                </div>
                <div className='d-flex flex-row my-2'>
                  <div className={`${styles.check} rounded-circle text-white bg-orange`}><FontAwesomeIcon icon={faCheck} /></div>
                  <div className='mx-3'>JavaScript</div>
                </div>
              </div>
              <div className='d-flex flex-column'>
                <div className='d-flex flex-row my-2'>
                  <div className={`${styles.check} rounded-circle text-white bg-orange`}><FontAwesomeIcon icon={faCheck} /></div>
                  <div className='mx-3'>Golang</div>
                </div>
                <div className='d-flex flex-row my-2'>
                  <div className={`${styles.check} rounded-circle text-white bg-orange`}><FontAwesomeIcon icon={faCheck} /></div>
                  <div className='mx-3'>C++</div>
                </div>
                <div className='d-flex flex-row my-2'>
                  <div className={`${styles.check} rounded-circle text-white bg-orange`}><FontAwesomeIcon icon={faCheck} /></div>
                  <div className='mx-3'>Ruby</div>
                </div>
                <div className='d-flex flex-row my-2'>
                  <div className={`${styles.check} rounded-circle text-white bg-orange`}><FontAwesomeIcon icon={faCheck} /></div>
                  <div className='mx-3'>10+ Bahasa lainnya</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className='d-flex w-50 justify-content-center'>
          <Image src={'/banner skill talent.png'} width={400} height={400} alt="banner skill talent" />
        </div>
      </div>
      <div className={`${styles.opinion}`}>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div className={`my-5 font-weight-bold`}><h2>Their opinion about Peworld</h2></div>
          <div className='d-flex flex-row align-items-center px-4'>
            <Link className={`${styles.arrow} d-flex align-items-center justify-content-center rounded-circle text-white text-center`} href="#carouselExampleIndicators2" role="button" data-slide="prev"><FontAwesomeIcon icon={faAngleLeft} /></Link>
            <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="d-flex flex-row justify-content-around">
                    <div className="col-md-4 mb-3 w-25">
                      <div className="card align-items-center text-center px-4 h-100">
                        <div className={`${styles.picBorder} rounded-circle my-4`}>
                          <Image className="img-fluid rounded-circle" alt="Harry Styles" width={175} height={175} src="/Harry Styles.png" />
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">Harry Styles</h4>
                          <div className={styles.position}>Web Developer</div>
                          <p className="card-text my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 w-25">
                      <div className="card align-items-center text-center px-4 h-100">
                        <div className={`${styles.picBorder} rounded-circle my-4`}>
                          <Image className="img-fluid rounded-circle" alt="Niall Horan" width={175} height={175} src="/Niall Horan.png" />
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">Niall Horan</h4>
                          <div className={styles.position}>Web Developer</div>
                          <p className="card-text my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 w-25">
                      <div className="card align-items-center text-center px-4 h-100">
                        <div className={`${styles.picBorder} rounded-circle my-4`}>
                          <Image className="img-fluid rounded-circle" alt="Louis Tomlinson" width={175} height={175} src="/Louis Tomlinson.png" />
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">Louis Tomlinson</h4>
                          <div className={styles.position}>Web Developer</div>
                          <p className="card-text my-2">Lorem ipsum dolor sit amet, consectetur </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="d-flex flex-row justify-content-around">
                    <div className="col-md-4 mb-3 w-25">
                      <div className="card align-items-center text-center px-4">
                        <div className={`${styles.picBorder} rounded-circle my-4`}>
                          <Image className="img-fluid rounded-circle" alt="Harry Styles" width={175} height={175} src="/Harry Styles.png" />
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">Harry Styles</h4>
                          <div className={styles.position}>Web Developer</div>
                          <p className="card-text my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 w-25">
                      <div className="card align-items-center text-center px-4">
                        <div className={`${styles.picBorder} rounded-circle my-4`}>
                          <Image className="img-fluid rounded-circle" alt="Harry Styles" width={175} height={175} src="/Harry Styles.png" />
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">Harry Styles</h4>
                          <div className={styles.position}>Web Developer</div>
                          <p className="card-text my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 w-25">
                      <div className="card align-items-center text-center px-4">
                        <div className={`${styles.picBorder} rounded-circle my-4`}>
                          <Image className="img-fluid rounded-circle" alt="Harry Styles" width={175} height={175} src="/Harry Styles.png" />
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">Harry Styles</h4>
                          <div className={styles.position}>Web Developer</div>
                          <p className="card-text my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link className={`${styles.arrow} d-flex align-items-center justify-content-center rounded-circle text-white text-center`} href="#carouselExampleIndicators2" role="button" data-slide="next"><FontAwesomeIcon icon={faAngleRight} /></Link>
          </div>
        </div>
      </div>
      <div className={`${styles.start}`}>
        <div className={`${styles.startBorder} bg-purple d-flex flex-row justify-content-between align-items-center px-`}>
          <div className={`${styles.startText} text-white`}>Lorem ipsum dolor sit amet</div>
          <Link href='/home'><button className={`btn btn-primary ${styles.hire} bg-white text-purple`}>Mulai Dari Sekarang</button></Link>
        </div>
      </div>
    </div>
  )
}

Home.navbar = "N1";