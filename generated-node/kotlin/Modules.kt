import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

@Serializable
data class Modules(
    val status: String,
    val meta: Meta,
    val data: Map<String, Data>
)

@Serializable
data class Meta(
    val count: Long,
    @SerialName("page_total")
    val pageTotal: Long,
    val total: Long,
    val limit: Long,
    val page: Long
)

@Serializable
data class Data(
    val profile: Profile,
    val name: String,
    val image: String,
    val tag: String,
    @SerialName("module_id_str")
    val moduleIdStr: String,
    @SerialName("module_id")
    val moduleId: Long,
    val type: String,
    @SerialName("price_credit")
    val priceCredit: Long
)

@Serializable
data class Profile(
    val torpedoes: Torpedoes
)

@Serializable
data class Torpedoes(
    @SerialName("torpedo_speed")
    val torpedoSpeed: Long,
    @SerialName("shot_speed")
    val shotSpeed: Double,
    @SerialName("max_damage")
    val maxDamage: Long,
    val distance: Double
)
