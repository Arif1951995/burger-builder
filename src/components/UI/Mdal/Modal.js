import React  from 'react'
import classes from './Modal.module.css'
import HOC from '../../../Hoc/HOC'
import Backdrop from '../Backdrop/Backdrop'


// const Modal = React.memo(
    
//     props => {
//         console.log('rendered')
//         return (
            

//             <HOC>
//                 <Backdrop 
//                 show={props.show}
//                 backdropCLicked={props.backdropCLicked}
//                 />
//                 <div className={classes.Modal}
//             style={{
//                 transform: props.show ? 'translateY(0)' : 'translate(-100vh)',
//                 opacity: props.show ? '1' : '0'
//             }}
//             >
//                 {props.children}
//             </div>
    
//             </HOC>
            
//         )

//     },
//     (prevProps, nextProps) => false 
//   );

// export default Modal


function Modal(props) {
    return (
        <HOC>
           <Backdrop 
                show={props.show}
                backdropCLicked={props.backdropCLicked}
                />
                <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translate(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
            >
                {props.children}
            </div>
    
            </HOC>
            
        )
    
}

export default Modal

