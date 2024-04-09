
const MainLogo = (props) => {
    const { className } = props;

    return (
        <div className={`main-logo ${className}`}>
            <img className='logo-img' src='https://res.cloudinary.com/dzkrz6yzs/image/upload/v1712689723/i7aoytljyzrxnxngk2r3.png' alt='Logo' />
            <span className='logo-span'>Menu master</span>
        </div>
    );
};

export default MainLogo