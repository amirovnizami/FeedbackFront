import { motion, AnimatePresence } from 'framer-motion';



function Modal({ isOpen, onClose,loginId }) {
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                        exit: { opacity: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="relative bg-white rounded-lg w-full max-w-md p-6 mx-4"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="text-center space-y-4">

                            <div className='flex justify-center items-center'>
                                <img src="/src/assets/modal_frame.png" alt="" />
                            </div>
                            <h1 className="text-2xl text-[#10C500] font-bold ">Sorğunuz qeydə alındı.</h1>

                            <div className="space-y-2 text-left flex justify-center flex-col items-center">
                                <p className="text-gray-700">Müraciət İD-si : <span className="font-semibold">{loginId}</span></p>
                            </div>

                            <div className="text-base text-[#E60000] space-y-2">
                                <p>Müraciətinizlə bağlı növbəti addımları izləyə bilmək üçün  ID-ni (ekran görüntüsü alaraq) yadda saxlayın!</p>
                            </div>
                            <div>
                                <p>Sorğunuz 30 gün ərzində cavablandırılacaqdır.</p>
                            </div>

                            <button
                                onClick={onClose}
                                className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
                            >
                                Bağla
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal;