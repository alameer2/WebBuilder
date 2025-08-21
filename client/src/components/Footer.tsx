export default function Footer() {
  return (
    <footer className="main-footer py-5">
      <nav className="social d-flex justify-content-center">
        <a href="/" target="" className="home mx-2"><i className="icon-home"></i></a>
        <a href="https://facebook.com/yemenflix" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
        <a href="https://twitter.com/yemenflix" target="_blank" className="twitter mx-2"><i className="icon-twitter"></i></a>
        <a href="https://youtube.com/yemenflix" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
        <a href="/contactus" target="" className="email mx-2"><i className="icon-email"></i></a>
      </nav>

      <nav className="links d-flex justify-content-center mt-3">
        <a href="/" target="" className="mx-2">يمن فليكس</a>
        <a href="/old" target="_blank" className="mx-2">الموقع القديم</a>
        <a href="/dmca" target="" className="mx-2">DMCA</a>
        <a href="/ad-policy" target="" className="mx-2">AD-P</a>
        <a href="#" target="_blank" className="mx-2">يمن فليكس نيوز</a>
        <a href="#" target="_blank" className="mx-2">شبكة يمن فليكس</a>
      </nav>

      <p className="copyright mb-0 font-size-12 text-center mt-3">
        جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025
      </p>
    </footer>
  );
}