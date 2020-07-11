export abstract class StorageStrategy {
	abstract registerVisitor(dni, name, surname, tel, cod_area)
	abstract denyEntryToVisitor(dni_visitante, temperature, smell_test_passed, questions)
	abstract getRandomQuestions()
	abstract checkoutVisitor(dni_visitante, facilities)
	abstract checkinVisitor(dni_visitante, temperature, smell_test_passed, questions)
	abstract getFacilities()
	abstract getCurrentGuardDni()
	abstract getUserById(id)
	abstract getUserByDNI(dni)
	abstract login(dni, password) 
	abstract logout()
}
