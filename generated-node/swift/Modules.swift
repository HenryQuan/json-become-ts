import Foundation

struct Modules: Codable {
    let status: String
    let meta: Meta
    let data: [String: Data]
}

struct Meta: Codable {
    let count: Int
    let pageTotal: Int
    let total: Int
    let limit: Int
    let page: Int

    enum CodingKeys: String, CodingKey {
        case count
        case pageTotal = "page_total"
        case total
        case limit
        case page
    }
}

struct Data: Codable {
    let profile: Profile
    let name: String
    let image: String
    let tag: String
    let moduleIdStr: String
    let moduleId: Int
    let type: String
    let priceCredit: Int

    enum CodingKeys: String, CodingKey {
        case profile
        case name
        case image
        case tag
        case moduleIdStr = "module_id_str"
        case moduleId = "module_id"
        case type
        case priceCredit = "price_credit"
    }
}

struct Profile: Codable {
    let torpedoes: Torpedoes
}

struct Torpedoes: Codable {
    let torpedoSpeed: Int
    let shotSpeed: Double
    let maxDamage: Int
    let distance: Double

    enum CodingKeys: String, CodingKey {
        case torpedoSpeed = "torpedo_speed"
        case shotSpeed = "shot_speed"
        case maxDamage = "max_damage"
        case distance
    }
}
