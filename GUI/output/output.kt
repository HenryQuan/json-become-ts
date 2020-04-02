/** This is the `Output` class */
data class Output (
  val id: String,
  val index: Int,
  val guid: String,
  val isActive: Boolean,
  val balance: String,
  val picture: String,
  val age: Int,
  val eyeColor: String,
  val name: String,
  val gender: String,
  val company: String,
  val email: String,
  val phone: String,
  val addres: String,
  val about: String,
  val registered: String,
  val latitude: Double,
  val longitude: Double,
  val tag: List<String>,
  val friend: List<Friend>,
  val greeting: String,
  val favoriteFruit: String
)

/** This is the `Friend` class */
data class Friend (
  val id: Int,
  val name: String
)
